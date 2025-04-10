import { Router } from "express";
import { userAuth } from "../middleware/user.auth.js";
import { createShortUrlController, redirectController } from "../controller/urlController.js";
import { body } from "express-validator";
const urlRouter = Router();

urlRouter.post('/create', body('originalUrl').isURL().withMessage('Must be a valid URL'), userAuth, createShortUrlController);
urlRouter.get('/:redirectId', redirectController);

export default urlRouter;
