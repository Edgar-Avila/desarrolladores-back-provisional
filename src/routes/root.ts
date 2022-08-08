import { Router } from "express";
import { welcome } from "../controllers/root";

const router = Router();

router.get('/', welcome);

export default(router);