import { asyncHandler } from './asyncHandler.js';
import ratingService from '../services/rating.service.js';

export const rateProduct = asyncHandler(async function rateProduct(req, res) {
  const userId = req.user._id;
  const { rate, productId } = req.body;

  await ratingService.rateProduct(rate, productId, userId);
  res.status(200).json({ message: 'Product rated successfully' });
});
