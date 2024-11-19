import express from 'express';
import { getAllPosts,createPost } from '../controllers/Posts.js';
// import generateImage from '../controllers/GenerateAllImage.js';


const router = express.Router();

router.get("/", getAllPosts);
router.post("/",createPost);

export default router;