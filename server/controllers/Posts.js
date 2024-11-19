import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
// import { createError } from "../../error.js";  // Use ES module import
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

// Cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        next(
            createError(
                error.status,
                error?.response?.data?.error?.message || error?.message
            )
        );
    }
};



// Create new post
export const createPost = async (req, res, next) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.secure_url, //here ? is missing
      });
  
      return res.status(200).json({ success: true, data: newPost });
    } catch (error) {
      console.log(error);
      return next(
        createError(error.status, error?.response?.data?.error.message)
      );
    }
};

export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
};
  