import express from "express";

const router = express.Router({mergeParams: true});
import {getUsers, getUser, deleteUser, updateUser, createUser} from '../controllers/users.js';

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
export default router;