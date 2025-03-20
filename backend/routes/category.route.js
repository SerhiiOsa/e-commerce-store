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

const router = express.Router();

router.get('/used', getUsedCategories);

router.use(authCheck, adminCheck);

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
