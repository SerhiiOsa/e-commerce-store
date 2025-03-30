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

export const getCommentOrFail = (review, commentId) => {
  const comment = review.comments.find(
    (item) => item._id.toString() === commentId
  );

  if (!comment) {
    const error = new Error('Comment not found');
    error.statusCode = 404;
    throw error;
  }

  return comment;
};
