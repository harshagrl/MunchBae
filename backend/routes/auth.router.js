import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  SignIn,
  signOut,
  SignUp,
  verifyOtp,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", SignIn);
authRouter.post("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;
