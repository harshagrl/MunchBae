import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import shopRouter from "./routes/shop.router.js";
import itemRouter from "./routes/item.router.js";
import orderRouter from "./routes/order.router.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";
const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173", // Local testing
  process.env.FRONTEND_CLIENT_URL // Vercel Production URL
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST","PUT"],
  },
});

app.set("io", io);
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);
socketHandler(io);
server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on ${port}`);
});
