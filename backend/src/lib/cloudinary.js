import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

// Allow configuration from env file
config();

// Configure cloudinary from env var
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
