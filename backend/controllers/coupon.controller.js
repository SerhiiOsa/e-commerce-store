import couponService from '../services/coupon.service.js';

export const getCoupon = async (req, res) => {
  try {
    const userId = req.user._id;
    const coupon = await couponService.getCoupon(userId);

    res.status(200).json(coupon);
  } catch (error) {
    console.error('Error in getCoupon controller', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user._id;
    const coupon = await couponService.validateCoupon(code, userId);

    res.status(200).json(coupon);
  } catch (error) {
    console.error('Error in validateCoupon controller', error.message);

    if (error.statusCode === 400 || error.statusCode === 404) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};
