import Joi from 'joi';

export const validateCouponSchema = Joi.object({
  body: Joi.object({
    code: Joi.string().required(),
  }),
});
