import Joi from 'joi';

export const createProductSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().min(3).max(255),
    description: Joi.string().required().min(10).max(500),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    image: Joi.string().uri().required(),
  }),
});

export const updateProductSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().min(3).max(255),
    description: Joi.string().required().min(10).max(500),
    price: Joi.number().required().min(0),
    category: Joi.string().required(),
    image: Joi.string().uri(),
  }),
});
