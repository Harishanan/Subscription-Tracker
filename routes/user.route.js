import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorise from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorise, getUser);

userRouter.post('/', (req, res) => res.send({title: 'CREATE new user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'UPDATE user'}));

userRouter.delete('/:id', (req, res) => res.send({title: 'DELETE user'}));

export default userRouter;