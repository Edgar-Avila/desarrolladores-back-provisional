import { Router } from "express";
import { createLike, deleteLike } from "../controllers/like";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post('/', verifyJWT, createLike);
router.delete('/', verifyJWT, deleteLike);

export default router;