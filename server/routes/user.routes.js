import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/signup', UserController.signupUser);
router.get('/verify', UserController.verifyEmail);
router.post('/signin', UserController.signinUser);
router.post('/reset-pw', UserController.initiateResetUserPassword);
router.post('/new-pw', UserController.updateUserPassword);
router.get('/session', UserController.getSession);
router.get('/signout', UserController.signoutUser);
router.get('/dump', UserController.getUsers);

export default router;
