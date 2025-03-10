import Coupon from '../models/coupon.model.js';

export default {
  async getCoupon(userId) {
    return await Coupon.findOne({ userId, isActive: true });
  },

  async validateCoupon(code, userId) {
    const coupon = await Coupon.findOne({ code, userId, isActive: true });

    if (!coupon) {
      const error = new Error('Coupon not found');
      error.statusCode = 404;
      throw error;
    }

    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();

      const error = new Error('Coupon expired');
      error.statusCode = 400;
      throw error;
    }

    return {
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      message: 'Coupon is valid',
    };
  },
};
