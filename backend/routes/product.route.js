import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
  updateProduct,
} from '../controllers/product.controller.js';
import authCheck from '../middleware/authCheck.js';
import adminCheck from '../middleware/adminCheck.js';
import validate from '../middleware/validator.js';
import {
  createProductSchema,
  updateProductSchema,
} from '../validators/product.validator.js';

const router = express.Router();

router.get('/featured', getFeaturedProducts);
router.get('/recommended', getRecommendedProducts);
router.get('/category/:category', getProductsByCategory);

router.use(authCheck, adminCheck);

router.get('/', getAllProducts);
router.post('/', validate(createProductSchema), createProduct);
router.put('/:id', validate(updateProductSchema), updateProduct);
router.patch('/:id', toggleFeaturedProduct);
router.delete('/:id', deleteProduct);

export default router;
