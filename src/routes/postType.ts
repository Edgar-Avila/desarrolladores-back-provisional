import { Router } from "express";
import { createPostType, deletePostType, getPostType, getPostTypes, updatePostType } from "../controllers/postType";

const router = Router();

router.post('/', createPostType);
router.get('/', getPostTypes);
router.get('/:id', getPostType);
router.delete('/:id', deletePostType);
router.put('/:id', updatePostType);

export default(router);