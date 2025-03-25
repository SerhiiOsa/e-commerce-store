import Joi from 'joi';

const productSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().positive().required(),
  category: Joi.string().optional(),
  image: Joi.string().uri().required(),
  isFeatured: Joi.boolean().optional(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
  __v: Joi.number().optional(),
  quantity: Joi.number().integer().min(1).required(),
});

export const createCheckoutSessionSchema = Joi.object({
  body: Joi.object({
    couponCode: Joi.string().optional().allow(null),
    products: Joi.array().items(productSchema).min(1).required(),
  }),
});
