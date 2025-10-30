import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

// Specify app requirements
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Allow app to use packages
app.use(express.json());
app.use(cookieParser())

// Specify routers
app.use("/api/auth", authRoutes);

// Set port for app to listen on
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
