import express from 'express';
import { getCurrentUser, loginUser,  logoutuser, registerUser } from '../controller/auth.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.post('/logout', logoutuser);

//get current user
router.get('/me', auth, getCurrentUser);

export default router;
