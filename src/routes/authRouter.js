import { Router } from 'express';
import signUpSchema from '../schemas/signUpSchema.js';
import validateSchema from './../middlewares/validateSchemaMiddleware.js';
import { registerUser } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), registerUser);

export default authRouter;
