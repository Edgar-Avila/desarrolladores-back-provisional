import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post";

const router = Router();

router.post('/posts', createPost);
router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.delete('/posts/:id', deletePost);
router.put('/posts/:id', updatePost);

export default(router);