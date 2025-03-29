import Review from '../models/review.model.js';

export const getReviewOrFail = async (reviewId) => {
  const review = await Review.findById(reviewId);

  if (!review) {
    const error = new Error('Review not found');
    error.statusCode = 404;
    throw error;
  }

  return review;
};
