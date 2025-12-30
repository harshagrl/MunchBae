import express from "express";
import { createEditShop } from "../controllers/shop.controller";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
const shopRouter = express.Router();

shopRouter.post(
  "/create-edit-shop",
  isAuth,
  upload.single("image"),
  createEditShop
);

export default shopRouter;
