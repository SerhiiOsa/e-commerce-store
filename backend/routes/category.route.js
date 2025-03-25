import express from 'express';
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getUsedCategories,
  updateCategory,
} from '../controllers/category.controller.js';
import authCheck from '../middleware/authCheck.js';
import adminCheck from '../middleware/adminCheck.js';
import validate from '../middleware/validator.js';
import {
  createCategorySchema,
  updateCategorytSchema,
} from '../validators/category.validator.js';

const router = express.Router();

router.get('/used', getUsedCategories);

router.use(authCheck, adminCheck);

router.get('/', getAllCategories);
router.post('/', validate(createCategorySchema), createCategory);
router.put('/:id', validate(updateCategorytSchema), updateCategory);
router.delete('/:id', deleteCategory);

export default router;
