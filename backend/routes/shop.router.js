import express from "express";
import { createEditShop, getMyShop } from "../controllers/shop.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const shopRouter = express.Router();

shopRouter.post(
  "/create-edit-shop",
  isAuth,
  upload.single("image"),
  createEditShop
);
shopRouter.get("/get-my-shop", isAuth, getMyShop);

export default shopRouter;
