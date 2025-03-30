import Review from '../models/review.model.js';
import { getProductOrFail } from '../helpers/productHelpers.js';
import { getCommentOrFail, getReviewOrFail } from '../helpers/reviewHelpers.js';

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

  async commentOnReview(text, reviewId, userId) {
    const comment = { text, user: userId };
    const commentedReview = await Review.findByIdAndUpdate(
      reviewId,
      { $push: { comments: comment } },
      { new: true }
    );

    if (!commentedReview) {
      const error = new Error('Review not found');
      error.statusCode = 404;
      throw error;
    }

    return commentedReview;
  },

  async updateCommentOnReview(text, reviewId, commentId, userId) {
    const review = await getReviewOrFail(reviewId);
    const comment = getCommentOrFail(review, commentId);

    if (comment.user.toString() !== userId.toString()) {
      const error = new Error('You are not allowed to edit the comment');
      error.statusCode = 403;
      throw error;
    }

    await Review.findOneAndUpdate(
      { _id: reviewId, 'comments._id': commentId },
      { $set: { 'comments.$.text': text } }
    );
  },

  async deleteCommentOnReview(reviewId, commentId, userId, isAdmin) {
    const review = await getReviewOrFail(reviewId);
    const comment = getCommentOrFail(review, commentId);

    if (comment.user.toString() !== userId.toString() && !isAdmin) {
      const error = new Error('You are not allowed to delete the review');
      error.statusCode = 403;
      throw error;
    }

    await Review.findByIdAndUpdate(
      reviewId,
      {
        $pull: { comments: { _id: commentId } },
      },
      { timestamps: true }
    );
  },
};
