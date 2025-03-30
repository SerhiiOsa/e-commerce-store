import express from 'express';
import {
  commentOnReview,
  createReview,
  deleteCommentOnReview,
  deleteReview,
  updateCommentOnReview,
  updateReview,
} from '../controllers/review.controller.js';
import authCheck from '../middleware/authCheck.js';
import validate from '../middleware/validator.js';
import {
  createCommentSchema,
  createReviewSchema,
  updateCommentSchema,
  updateReviewSchema,
} from '../validators/review.validator.js';

const router = express.Router();

router.use(authCheck);

router.post('/', validate(createReviewSchema), createReview);
router.patch('/:id', validate(updateReviewSchema), updateReview);
router.delete('/:id', deleteReview);

router.post(
  '/:reviewId/comments',
  validate(createCommentSchema),
  commentOnReview
);
router.put(
  '/:reviewId/comments/:commentId',
  validate(updateCommentSchema),
  updateCommentOnReview
);
router.delete('/:reviewId/comments/:commentId', deleteCommentOnReview);

export default router;
