import jwt, { decode } from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res) => {
  try {
    // Obtain token from request (jwt is name of token) and if return 401 error if non provided
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorised - No Token Provided",
      });
    }

    // Decode token using JWT_SECRET to get userId and return 401 if invalid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorised - Invalid Token" });
    }

    // If all good, find user using decoded userId and return all fields except password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is authenticated, save user into request and call next function
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
