import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getOwnerorders,
  getUserOrders,
  placeOrder,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place-order", isAuth, placeOrder);
orderRouter.get("/user-orders", isAuth, getUserOrders);
orderRouter.get("/owner-orders", isAuth, getOwnerorders);

export default orderRouter;
