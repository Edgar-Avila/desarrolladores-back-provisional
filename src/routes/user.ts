import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const router = Router();

router.post('/usuarios', createUser);
router.get('/usuarios', getUsers);
router.get('/usuarios/:id', getUser);
router.delete('/usuarios/:id', deleteUser);
router.put('/usuarios/:id', updateUser);

export default(router);