import { asyncHandler } from './asyncHandler.js';
import reviewService from '../services/review.service.js';

export const createReview = asyncHandler(async function createReview(req, res) {
  const { text, productId } = req.body;
  const userId = req.user._id;

  const review = await reviewService.createReview(text, productId, userId);
  res.status(201).json({ review });
});

export const updateReview = asyncHandler(async function updateReview(req, res) {
  const reviewId = req.params.id;
  const { text } = req.body;
  const userId = req.user._id;

  const updatedReview = await reviewService.updateReview(
    text,
    reviewId,
    userId
  );
  res.status(200).json({ updatedReview });
});

export const deleteReview = asyncHandler(async function deleteReview(req, res) {
  const reviewId = req.params.id;
  const userId = req.user._id;
  const isAdmin = req.user.role === 'admin';

  await reviewService.deleteReview(reviewId, userId, isAdmin);
  res.status(200).json({ message: 'Review deleted successfully' });
});

export const commentOnReview = asyncHandler(async function commentOnReview(
  req,
  res
) {
  const { text } = req.body;
  const { reviewId } = req.params;
  const userId = req.user._id;

  const commentedReview = await reviewService.commentOnReview(
    text,
    reviewId,
    userId
  );
  res.status(201).json({ commentedReview });
});

export const updateCommentOnReview = asyncHandler(
  async function updateCommentOnReview(req, res) {
    const { text } = req.body;
    const { reviewId, commentId } = req.params;
    const userId = req.user._id;

    await reviewService.updateCommentOnReview(
      text,
      reviewId,
      commentId,
      userId
    );
    res.status(200).json({ message: 'Comment updated successfully' });
  }
);

export const deleteCommentOnReview = asyncHandler(
  async function deleteCommentOnReview(req, res) {
    const { reviewId, commentId } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.role === 'admin';

    await reviewService.deleteCommentOnReview(
      reviewId,
      commentId,
      userId,
      isAdmin
    );
    res.status(200).json({ message: 'Comment deleted successfully' });
  }
);
