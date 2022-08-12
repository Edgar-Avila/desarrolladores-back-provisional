import { Router } from "express";
import { deleteUser, getUser, getUsers, topContributors, updateUser } from "../controllers/user";
import { verifyJWT } from '../middleware/verifyJWT';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.delete('/', verifyJWT, deleteUser);
router.put('/', verifyJWT, updateUser);
router.get('/top-contributors/:number', topContributors);

export default (router);