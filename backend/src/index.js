import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

// Specify app requirements
dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Allows extraction of json data out of bosy
app.use(express.json());

// Specify routers
app.use("/api/auth", authRoutes);

// Set port for app to listen on
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
