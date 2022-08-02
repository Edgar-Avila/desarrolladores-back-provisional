import { Router } from "express";
import { createPostType, deletePostType, getPostType, getPostTypes, updatePostType } from "../controllers/postType";

const router = Router();

router.post('/PostTypes', createPostType);
router.get('/PostTypes', getPostTypes);
router.get('/PostTypes/:id', getPostType);
router.delete('/PostTypes/:id', deletePostType);
router.put('/PostTypes/:id', updatePostType);

export default(router);