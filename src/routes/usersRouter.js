import { Router } from 'express';
import { getUserInfo } from '../controllers/usersController.js';
import validateUserToken from '../middlewares/authorizeUserMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/me', validateUserToken, getUserInfo);

export default usersRouter;
