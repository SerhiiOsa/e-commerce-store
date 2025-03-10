import express from 'express';
import authCheck from '../middleware/authCheck.js';
import {
  checkoutSuccess,
  createCheckoutSession,
} from '../controllers/payment.controller.js';

const router = express.Router();

router.use(authCheck);

router.post('/create-checkout-session', createCheckoutSession);
router.post('/checkout-success', checkoutSuccess);

export default router;
