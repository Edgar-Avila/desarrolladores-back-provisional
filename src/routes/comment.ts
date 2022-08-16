import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comment";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post('/', verifyJWT, createComment);
router.put('/:id', verifyJWT, updateComment);
router.delete('/:id', verifyJWT, deleteComment);

export default router;
