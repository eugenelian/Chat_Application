import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

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
    console.error("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login route for users
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find if user with email exists, if not return error
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Checks if password matches hashed password in db, else return error
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // If authenticated, generate token and return to user with status 200
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout route for users
export const logout = (req, res) => {
  try {
    // Remove cookie from response and return 200
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Profile Route for users
export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    // Access userId from token through req
    const userId = req.user._id;

    // Checks if profile pic is provided, else return error
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    // Upload image into cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    // Find user and update the image secure url. Returns the user after update (new: true)
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Checks Auth Status for refreshing
export const checkAuth = (req, res) => {
  try {
    // See if user has been authenticated yet
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in checkAuth controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
