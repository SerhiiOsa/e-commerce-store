import express from 'express';
import {
  getProfile,
  login,
  logout,
  refreshTokens,
  signup,
} from '../controllers/auth.controller.js';
import authCheck from '../middleware/authCheck.js';
import validate from '../middleware/validator.js';
import { loginSchema, signupSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh-token', refreshTokens);
router.get('/profile', authCheck, getProfile);

export default router;
