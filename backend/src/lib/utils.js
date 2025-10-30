import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  // Generate token from userId and JWT_SECRET in env, that expires in 7 days
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Stores cookies with name "jwt" in response. Set options for extra security
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // Prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // Set it to use HTTPS in production
  });

  return token;
};
