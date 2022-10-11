import { Router } from 'express';
import validateSchema from './../middlewares/validateSchemaMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';
import validateUserToken from '../middlewares/authorizeUserMiddleware.js';
import { shortenUrl, getUrl, openUrl } from '../controllers/urlsController.js';

const urlsRouter = Router();

urlsRouter.post('/urls/shorten', validateUserToken, validateSchema(urlSchema), shortenUrl);
urlsRouter.get('/urls/:id', getUrl);
urlsRouter.get('/urls/open/:shortUrl', openUrl);

export default urlsRouter;
