import express from "express";
import { createEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth.js";
const shopRouter = express.Router();

shopRouter.get("/create-edit-shop", isAuth, createEditShop);

export default shopRouter;
