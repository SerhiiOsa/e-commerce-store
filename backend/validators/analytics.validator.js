import Joi from 'joi';

export const analyticsSchema = Joi.object({
  query: Joi.object({
    period: Joi.string().valid('month', 'year').optional().allow(''),
  }),
});
