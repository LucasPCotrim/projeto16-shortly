import { Router } from 'express';
import signUpSchema from '../schemas/signUpSchema.js';
import signInSchema from '../schemas/signInSchema.js';
import validateSchema from './../middlewares/validateSchemaMiddleware.js';
import { registerUser, login } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), registerUser);
authRouter.post('/signin', validateSchema(signInSchema), login);

export default authRouter;
