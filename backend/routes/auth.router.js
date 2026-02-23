import express from "express";
import {
  googleAuth,
  resetPassword,
  sendOtp,
  sendSignupOtp,
  SignIn,
  signOut,
  SignUp,
  verifyOtp,
} from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/send-signup-otp", sendSignupOtp);
authRouter.post("/signin", SignIn);
authRouter.get("/signout", signOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.post("/google-auth", googleAuth);

export default authRouter;
