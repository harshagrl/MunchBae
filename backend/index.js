import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import cors from "cors";
import shopRouter from "./routes/shop.router.js";
import itemRouter from "./routes/item.router.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);

app.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on ${port}`);
});
