import express from 'express';

import authCheck from '../middleware/authCheck.js';
import adminCheck from '../middleware/adminCheck.js';
import { getAnaliticsData } from '../controllers/analytics.controller.js';
import validate from '../middleware/validator.js';
import { analyticsSchema } from '../validators/analytics.validator.js';

const router = express.Router();

router.get(
  '/',
  authCheck,
  adminCheck,
  validate(analyticsSchema),
  getAnaliticsData
);

export default router;
