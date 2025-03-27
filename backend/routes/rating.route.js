import express from 'express';
import { rateProduct } from '../controllers/rating.controller.js';
import authCheck from '../middleware/authCheck.js';
import validate from '../middleware/validator.js';
import { rateProductSchema } from '../validators/rating.validator.js';

const router = express.Router();

router.post('/', authCheck, validate(rateProductSchema), rateProduct);

export default router;
