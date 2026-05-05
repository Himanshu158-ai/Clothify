import express from 'express'

import {validateRegister,validateLogin} from '../validator/auth.validation.js';
import { registerUser,loginUser , getProfile, continueWithGoogle, logoutUser} from '../controllers/auth.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
import passport from '../config/passport.js';

const router = express.Router();


router.post('/register',validateRegister,registerUser);
router.post('/login',validateLogin,loginUser);
router.get('/profile',verifyToken,getProfile);
router.post('/logout',logoutUser);

// Google OAuth Routes
router.get('/auth/google',passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',passport.authenticate('google', { session: false }),continueWithGoogle);


export default router;
