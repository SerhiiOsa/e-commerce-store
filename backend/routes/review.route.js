import express from 'express';
import {
  createReview,
  deleteReview,
  updateReview,
} from '../controllers/review.controller.js';
import authCheck from '../middleware/authCheck.js';
import adminCheck from '../middleware/adminCheck.js';
import validate from '../middleware/validator.js';
import {
  createReviewSchema,
  updateReviewSchema,
} from '../validators/review.validator.js';

const router = express.Router();

router.use(authCheck);

router.post('/', validate(createReviewSchema), createReview);
router.patch('/:id', validate(updateReviewSchema), updateReview);
router.delete('/:id', deleteReview);

export default router;
