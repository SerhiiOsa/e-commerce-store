import Review from '../models/review.model.js';
import { getProductOrFail } from '../helpers/productHelpers.js';
import { getReviewOrFail } from '../helpers/reviewHelpers.js';

export default {
  async createReview(text, productId, userId) {
    await getProductOrFail(productId);

    return await Review.create({
      text,
      product: productId,
      user: userId,
    });
  },

  async updateReview(text, reviewId, userId) {
    const review = await getReviewOrFail(reviewId);

    if (review.user.toString() !== userId.toString()) {
      const error = new Error('You are not allowed to edit the review');
      error.statusCode = 403;
      throw error;
    }

    return await Review.findByIdAndUpdate(reviewId, { text }, { new: true });
  },

  async deleteReview(reviewId, userId, isAdmin) {
    const review = await getReviewOrFail(reviewId);

    if (review.user.toString() !== userId.toString() && !isAdmin) {
      const error = new Error('You are not allowed to delete the review');
      error.statusCode = 403;
      throw error;
    }

    await Review.findByIdAndDelete(reviewId);
  },
};
