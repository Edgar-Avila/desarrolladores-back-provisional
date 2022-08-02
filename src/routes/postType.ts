import { Router } from "express";
import { createPostType, deletePostType, getPostType, getPostTypes, updatePostType } from "../controllers/postType";

const router = Router();

router.post('/post-types', createPostType);
router.get('/post-types', getPostTypes);
router.get('/post-types/:id', getPostType);
router.delete('/post-types/:id', deletePostType);
router.put('/post-types/:id', updatePostType);

export default(router);