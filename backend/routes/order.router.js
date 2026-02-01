import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  acceptOrderAssignment,
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
orderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrderAssignment);

export default orderRouter;
