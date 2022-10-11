import { Router } from 'express';
import validateSchema from './../middlewares/validateSchemaMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';
import validateUserToken from '../middlewares/authorizeUserMiddleware.js';
import { shortenUrl } from '../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateUserToken, validateSchema(urlSchema), shortenUrl);

export default urlsRouter;
