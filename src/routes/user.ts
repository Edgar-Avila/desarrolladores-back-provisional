import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user";
import { verifyJWT } from '../middleware/verifyJWT';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/', verifyJWT, deleteUser);
router.put('/', verifyJWT, updateUser);

export default (router);