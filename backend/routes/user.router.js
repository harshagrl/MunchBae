import express from "express";
import {
  getCurrentUser,
  updateUserLocation,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.post("/update-location", isAuth, updateUserLocation);
userRouter.put("/profile", isAuth, updateProfile);

export default userRouter;
