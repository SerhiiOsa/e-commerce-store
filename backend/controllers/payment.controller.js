import paymentService from '../services/payment.service.js';

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    const userId = req.user._id;

    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: 'Invalid or empty products array' });
    }

    const { id, totalAmount } = await paymentService.createCheckoutSession(
      products,
      couponCode,
      userId
    );

    res.status(200).json({ id, totalAmount });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res
      .status(500)
      .json({ message: 'Error processing checkout', error: error.message });
  }
};

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const orderId = await paymentService.checkoutSuccess(sessionId);
    res.status(200).json({
      success: true,
      message:
        'Payment successful, order created, and coupon deactivated if used.',
      orderId,
    });
  } catch (error) {
    console.error('Error processing successful checkout:', error);
    res.status(500).json({
      message: 'Error processing successful checkout',
      error: error.message,
    });
  }
};
