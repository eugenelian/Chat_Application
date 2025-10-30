import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

// Signup route for users
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if all fields are provided, if not, return error message
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if password is less than 6 and if so, return error message
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Find for existing user by email and if so, return error message
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // Generate salt using bcrypt genSalt function with 10 rounds (by convention)
    const salt = await bcrypt.genSalt(10);

    // Hash password using bcryptjs 123456 => sfddbfcshbdchsjchbcds
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with hashed password
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // Generate JWT token here
      generateToken(newUser.id, res);

      // Await to save user
      await newUser.save();

      // Return 201 (created) status code
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      // Unable to create user
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
