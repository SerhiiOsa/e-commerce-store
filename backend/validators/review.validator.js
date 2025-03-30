import Joi from 'joi';

export const createReviewSchema = Joi.object({
  body: Joi.object({
    text: Joi.string().min(1).max(1000).required(),
    productId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message(
        'Invalid productId format. It must be a valid MongoDB ObjectId.'
      ),
  }),
});

export const updateReviewSchema = Joi.object({
  params: Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message('Invalid Id format. It must be a valid MongoDB ObjectId.'),
  }),
  body: Joi.object({
    text: Joi.string().min(1).max(1000).required(),
  }),
});

export const createCommentSchema = Joi.object({
  params: Joi.object({
    reviewId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message('Invalid Id format. It must be a valid MongoDB ObjectId.'),
  }),
  body: Joi.object({
    text: Joi.string().min(1).max(500).required(),
  }),
});

export const updateCommentSchema = Joi.object({
  params: Joi.object({
    reviewId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message('Invalid Id format. It must be a valid MongoDB ObjectId.'),
    commentId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .message('Invalid Id format. It must be a valid MongoDB ObjectId.'),
  }),
  body: Joi.object({
    text: Joi.string().min(1).max(500).required(),
  }),
});
