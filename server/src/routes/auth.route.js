import express from 'express'
import {validateRegister,validateLogin} from '../validator/auth.validation.js';
import { registerUser,loginUser , getProfile} from '../controllers/auth.controller.js';
import verifyToken from '../middleware/auth.middleware.js';
const router = express.Router();


router.post('/register',validateRegister,registerUser);
router.post('/login',validateLogin,loginUser);
router.get('/profile',verifyToken,getProfile);


export default router;
