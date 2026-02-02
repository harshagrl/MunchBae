import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";
import DeliveryAssignment from "../models/deliveryAssignment.model.js";
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, totalAmount } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart items is empty" });
    }
    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({ message: "Delivery address in invalid" });
    }
    const groupItemsByShop = {};
    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });
    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          return res.status(400).json({ message: "Shop not found" });
        }
        const items = groupItemsByShop[shopId];
        const subtotal = items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0,
        );
        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal,
          shopOrderItem: items.map((i) => ({
            item: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        };
      }),
    );
    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });
    await newOrder.populate(
      "shopOrders.shopOrderItem.item",
      "name image price",
    );
    await newOrder.populate("shopOrders.shop", "name");
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: `Place order error: ${error}` });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role === "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "fullName email mobile")
        .populate("shopOrders.shopOrderItem.item", "name image price");

      if (!orders) {
        return res.status(400).json({ message: "Orders not found" });
      }

      return res.status(200).json(orders);
    } else if (user.role === "owner") {
      const orders = await Order.find({ "shopOrders.owner": req.userId })
        .sort({
          createdAt: -1,
        })
        .populate("shopOrders.shop", "name")
        .populate("user")
        .populate("shopOrders.shopOrderItem.item", "name image price")
        .populate("shopOrders.assignedDeliveryPartner", "fullName mobile");

      if (!orders) {
        return res.status(400).json({ message: "Orders not found" });
      }

      const particularShopOrders = orders.map((order) => ({
        _id: order._id,
        paymentMethod: order.paymentMethod,
        user: order.user,
        shopOrders: order.shopOrders.find((o) => o.owner._id == req.userId),
        createdAt: order.createdAt,
        deliveryAddress: order.deliveryAddress,
      }));

      return res.status(200).json(particularShopOrders);
    }
  } catch (error) {
    return res.status(500).json({ message: `Get My Orders error: ${error}` });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);
    const shopOrder = order.shopOrders.find((o) => o.shop == shopId);
    if (!shopOrder) {
      return res.status(400).json({ message: `Shop Order not found` });
    }
    shopOrder.status = status;
    let deliveryBoysPayload = [];
    if (status === "out for delivery" && !shopOrder.assignment) {
      const { longitude, latitude } = order.deliveryAddress;
      const nearByDeliveryPartners = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 5000,
          },
        },
      });

      const nearByIds = nearByDeliveryPartners.map((b) => b._id);
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByIds },
        status: { $nin: ["broadcasted", "completed"] },
      }).distinct("assignedTo");
      const busyIdSet = new Set(busyIds.map((id) => id.toString()));
      const availableDeliveryPartners = nearByDeliveryPartners.filter(
        (b) => !busyIdSet.has(b._id.toString()),
      );
      const candidates = availableDeliveryPartners.map((b) => b._id);
      if (candidates.length === 0) {
        await order.save();
        return res
          .status(200)
          .json({ message: "No delivery partners available at the moment" });
      }
      const deliveryAssignment = await DeliveryAssignment.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        broadcastedTo: candidates,
        status: "broadcasted",
      });
      shopOrder.assignedDeliveryPartner = deliveryAssignment.assignedTo;
      shopOrder.assignment = deliveryAssignment._id;
      deliveryBoysPayload = availableDeliveryPartners.map((b) => ({
        id: b._id,
        fullName: b.fullName,
        longitude: b.location.coordinates?.[0],
        latitude: b.location.coordinates?.[1],
        mobile: b.mobile,
      }));
    }
    await shopOrder.save();
    await order.save();
    const updatedShopOrder = order.shopOrders.find((o) => o.shop == shopId);
    await order.populate("shopOrders.shop", "name");
    await order.populate(
      "shopOrders.assignedDeliveryPartner",
      "fullName email mobile",
    );
    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryPartner: updatedShopOrder?.assignedDeliveryPartner,
      availableDeliveryPartners: deliveryBoysPayload,
      assignment: updatedShopOrder?.assignment._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Updating order status error: ${error}` });
  }
};

export const getDeliveryPartnerAssignment = async (req, res) => {
  try {
    const deliveryPartnerId = req.userId;
    const assignments = await DeliveryAssignment.find({
      broadcastedTo: deliveryPartnerId,
      status: "broadcasted",
    })
      .populate("order")
      .populate("shop");

    if (!assignments || assignments.length === 0) {
      return res.status(200).json([]);
    }

    const formatted = assignments
      .map((a) => {
        if (!a.order || !a.shop || !Array.isArray(a.order.shopOrders)) {
          return null;
        }

        const shopOrder = a.order.shopOrders.find(
          (so) => so._id && a.shopOrderId && so._id.equals(a.shopOrderId),
        );

        return {
          orderId: a.order._id,
          assignmentId: a._id,
          shopName: a.shop?.name || null,
          deliveryAddress: a.order?.deliveryAddress || null,
          items: shopOrder?.shopOrderItem || [],
          subtotal: shopOrder?.subtotal || 0,
          status: a.status,
        };
      })
      .filter(Boolean);

    return res.status(200).json(formatted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get Delivery Partner Assignment error: ${error}` });
  }
};

export const acceptOrderAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await DeliveryAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(400).json({ message: "Assignment not found" });
    }
    if (assignment.status !== "broadcasted") {
      return res.status(400).json({ message: "Assignment is not available" });
    }
    const alreadyAssigned = await DeliveryAssignment.findOne({
      assignedTo: req.userId,
      status: { $nin: ["broadcasted", "completed"] },
    });
    if (alreadyAssigned) {
      return res
        .status(400)
        .json({ message: "You have already an active assignment" });
    }
    assignment.assignedTo = req.userId;
    assignment.status = "assigned";
    assignment.acceptedAt = new Date();
    await assignment.save();
    const order = await Order.findById(assignment.order);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    const shopOrder = order.shopOrders.find((o) =>
      o._id.equals(assignment.shopOrderId),
    );
    shopOrder.assignedDeliveryPartner = req.userId;
    await order.save();

    return res
      .status(200)
      .json({ message: "Assignment accepted successfully", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Accepting order assignment error: ${error}` });
  }
};

export const getCurrentOrder = async (req, res) => {
  try {
    const assignment = await DeliveryAssignment.findOne({
      assignedTo: req.userId,
      status: "assigned",
    })
      .populate("shop", "name")
      .populate("assignedTo", "fullName mobile email location")
      .populate({
        path: "order",
        populate: [
          {
            path: "user",
            select: "fullName mobile email location",
          },
        ],
      });
    if (!assignment) {
      return res.status(200).json({ message: "No current active assignment" });
    }
    if (!assignment.order) {
      return res.status(200).json({ message: "No current active order" });
    }
    const shopOrder = assignment.order.shopOrders.find((so) =>
      so._id.equals(assignment.shopOrderId),
    );
    if (!shopOrder) {
      return res.status(200).json({ message: "No current active shop order" });
    }
    let deliveryPartnerLocation = { lat: null, long: null };
    if (assignment.assignedTo.location.coordinates.length === 2) {
      deliveryPartnerLocation.lat =
        assignment.assignedTo.location.coordinates[1];
      deliveryPartnerLocation.long =
        assignment.assignedTo.location.coordinates[0];
    }

    const customerLocation = { lat: null, long: null };
    if (assignment.order.deliveryAddress) {
      customerLocation.lat = assignment.order.deliveryAddress.latitude;
      customerLocation.long = assignment.order.deliveryAddress.longitude;
    }
    return res.status(200).json({
      _id: assignment.order._id,
      user: assignment.order.user,
      shopOrder: shopOrder,
      deliveryAddress: assignment.order.deliveryAddress,
      deliveryPartnerLocation,
      customerLocation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get Current Order error: ${error}` });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user")
      .populate({
        path: "shopOrders.shop",
        model: "Shop",
      })
      .populate({
        path: "shopOrders.assignedDeliveryPartner",
        model: "User",
      })
      .populate({
        path: "shopOrders.shopOrderItem.item",
        model: "Item",
      })
      .lean();

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: `Get Order By Id error: ${error}` });
  }
};
