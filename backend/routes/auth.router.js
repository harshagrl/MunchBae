import express from "express";
import { SignIn, signOut, SignUp } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", SignUp);
authRouter.post("/signin", SignIn);
authRouter.post("/signout", signOut);

export default authRouter;
