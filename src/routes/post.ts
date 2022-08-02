import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post";

const router = Router();

router.post('/', createPost);
router.get('/', getPosts);
router.get('/:id', getPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default(router);