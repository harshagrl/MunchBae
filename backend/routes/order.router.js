import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getDeliveryPartnerAssignment,
  getMyOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders);
orderRouter.get(
  "/delivery-partner-assignment",
  isAuth,
  getDeliveryPartnerAssignment,
);
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus);

export default orderRouter;
