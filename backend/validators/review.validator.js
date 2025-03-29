import Joi from 'joi';

export const createReviewSchema = Joi.object({
  body: Joi.object({
    text: Joi.string().required(),
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
    text: Joi.string().required(),
  }),
});
