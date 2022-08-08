import { Router } from "express";
import { welcome } from "../controllers/root";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.get('/', verifyJWT, welcome);

export default(router);