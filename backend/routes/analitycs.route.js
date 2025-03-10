import express from 'express';

import authCheck from '../middleware/authCheck.js';
import adminCheck from '../middleware/adminCheck.js';
import { getAnaliticsData } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get('/', authCheck, adminCheck, getAnaliticsData);

export default router;
