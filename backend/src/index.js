import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// Specify app requirements
dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve();

// Allow app to use packages
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Specify routers
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Setting up middleware for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/.*/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Set port for app to listen on
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
