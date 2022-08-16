import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, updatePost, getPostsByLanguage } from "../controllers/post";
import { verifyJWT } from "../middleware/verifyJWT";

const router = Router();

router.post('/', verifyJWT, createPost);
router.get('/', getPosts);
router.get('/by-language', getPostsByLanguage);
router.get('/:id', getPost);
router.delete('/:id', verifyJWT, deletePost);
router.put('/:id', verifyJWT, updatePost);

export default(router);
