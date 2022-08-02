import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user";

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default(router);