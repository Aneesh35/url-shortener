import { Router } from 'express'
import { body } from 'express-validator';
import { signUpController, signInController, ProfileController } from '../controller/userController.js';
import { userAuth } from '../middleware/user.auth.js';
const UserRouter = Router();

UserRouter.post('/SignUp', body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!'), signUpController)

UserRouter.post('/SignIn', body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 3 }).withMessage('password must be at-least 3 characters long !!'), signInController)

UserRouter.post('/getProfile', userAuth, ProfileController)

export default UserRouter;