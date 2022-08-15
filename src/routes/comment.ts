import { Router } from "express";
import { createComment, deleteComment } from "../controllers/comment";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post('/', verifyJWT, createComment);
router.delete('/:id', verifyJWT, deleteComment);

export default router;