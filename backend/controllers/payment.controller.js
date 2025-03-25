import paymentService from '../services/payment.service.js';
import { asyncHandler } from './asyncHandler.js';

export const createCheckoutSession = asyncHandler(
  async function createCheckoutSession(req, res) {
    const { products, couponCode } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(products) || products.length === 0) {
      const error = new Error('Invalid or empty products array');
      error.statusCode = 400;
      throw error;
    }

    const { id, totalAmount } = await paymentService.createCheckoutSession(
      products,
      couponCode,
      userId
    );

    res.status(200).json({ id, totalAmount });
  }
);

export const checkoutSuccess = asyncHandler(async function checkoutSuccess(
  req,
  res
) {
  const { sessionId } = req.body;
  const orderId = await paymentService.checkoutSuccess(sessionId);
  res.status(200).json({
    success: true,
    message:
      'Payment successful, order created, and coupon deactivated if used.',
    orderId,
  });
});
