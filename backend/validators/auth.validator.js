import Joi from 'joi';
import authConfig from '../config/auth.js';

export const signupSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(authConfig.passwordMinLength).required(),
  }),
});

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(authConfig.passwordMinLength).required(),
  }),
});
