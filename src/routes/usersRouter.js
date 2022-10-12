import { Router } from 'express';
import { getUserInfo, getRanking } from '../controllers/usersController.js';
import validateUserToken from '../middlewares/authorizeUserMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/me', validateUserToken, getUserInfo);
usersRouter.get('/ranking', getRanking);

export default usersRouter;
