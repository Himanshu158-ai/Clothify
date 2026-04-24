import express from 'express'
import {validateRegister,validateLogin} from '../validator/auth.validation.js';
import { registerUser,loginUser } from '../controllers/auth.controller.js';
const router = express.Router();


router.post('/register',validateRegister,registerUser);
router.get('/login',validateLogin,loginUser)



export default router;
