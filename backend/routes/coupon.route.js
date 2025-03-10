import express from 'express';
import authCheck from '../middleware/authCheck.js';
import { getCoupon, validateCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.use(authCheck);

router.get('/', getCoupon);
router.post('/validate', validateCoupon);

export default router;
