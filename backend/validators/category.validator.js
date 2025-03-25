import Joi from 'joi';

export const createCategorySchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().min(3).max(255),
    image: Joi.string().uri().required(),
  }),
});

export const updateCategorytSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().required().min(3).max(255),
    image: Joi.string().uri(),
  }),
});
