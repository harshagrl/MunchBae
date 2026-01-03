import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;

    if (!name || !category || !foodType || !price) {
      return res.status(400).json({
        message: "Missing required fields: name, category, foodType, or price",
      });
    }

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: `shop not found` });
    }
    const item = await Item.create({
      name,
      category,
      foodType,
      price: Number(price),
      image,
      shop: shop._id,
    });
    shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner");
    return res.status(201).json(shop);
  } catch (error) {
    console.error("Full error:", error);
    return res.status(500).json({ message: `add item error: ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const item = await Item.findByIdAndUpdate(
      itemId,
      {
        name,
        category,
        foodType,
        price,
        image,
      },
      { new: true }
    );
    if (!item) {
      return res.status(400).json({ message: `item not found` });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `edit item error: ${error}` });
  }
};

export const getItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: `item not found` });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `get item error: ${error}` });
  }
};
