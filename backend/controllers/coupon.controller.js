import couponService from '../services/coupon.service.js';
import { asyncHandler } from './asyncHandler.js';

export const getCoupon = asyncHandler(async function getCoupon(req, res) {
  const userId = req.user._id;
  const coupon = await couponService.getCoupon(userId);

  res.status(200).json(coupon);
});

export const validateCoupon = asyncHandler(async function validateCoupon(
  req,
  res
) {
  const { code } = req.body;
  const userId = req.user._id;
  const coupon = await couponService.validateCoupon(code, userId);

  res.status(200).json(coupon);
});
