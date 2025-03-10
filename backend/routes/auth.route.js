import express from 'express';
import {
  getProfile,
  login,
  logout,
  refreshTokens,
  signup,
} from '../controllers/auth.controller.js';
import authCheck from '../middleware/authCheck.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh-token', refreshTokens);
router.get('/profile', authCheck, getProfile);

export default router;
