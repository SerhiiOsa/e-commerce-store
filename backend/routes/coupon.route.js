import express from 'express';
import authCheck from '../middleware/authCheck.js';
import { getCoupon, validateCoupon } from '../controllers/coupon.controller.js';
import validate from '../middleware/validator.js';
import { validateCouponSchema } from '../validators/coupon.validator.js';

const router = express.Router();

router.use(authCheck);

router.get('/', getCoupon);
router.post('/validate', validate(validateCouponSchema), validateCoupon);

export default router;
