import Joi from 'joi';

export const rateProductSchema = Joi.object({
  body: Joi.object({
    rate: Joi.number().integer().required().min(1).max(5),
    productId: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/),
  }),
});
