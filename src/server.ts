import { authMiddleware } from "./middlewares/auth.middleware";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import conversationRoutes from "./routes/conversation.routes";
import messageRoutes from "./routes/message.routes";
import cookieParser from "cookie-parser";
dotenv.config(); // reads and loads values into process.env
console.log("MONGO_URI =", process.env.MONGO_URI);


const app = express(); // creating server instance

// middlewares
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());  // allows server to read JSON data from requests

// test route
app.get("/", (req, res) => {
  res.send("Chat App Backend Running");    // opening "/" sends response
});

app.use("/auth", authRoutes);
app.get("/me", authMiddleware, (req, res) => {
    return res.json({
      message: "You are authenticated",
      userId: (req as any).userId,
    });
  });

  app.use("/conversations", conversationRoutes);
  app.use("/messages", messageRoutes);

// connect DB & start server
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port - ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
