import express from 'express';
import authCheck from '../middleware/authCheck.js';
import {
  checkoutSuccess,
  createCheckoutSession,
} from '../controllers/payment.controller.js';
import validate from '../middleware/validator.js';
import { createCheckoutSessionSchema } from '../validators/payment.validator.js';

const router = express.Router();

router.use(authCheck);

router.post(
  '/create-checkout-session',
  validate(createCheckoutSessionSchema),
  createCheckoutSession
);
router.post('/checkout-success', checkoutSuccess);

export default router;
