import express from 'express';
import {
  addToCart,
  getCartProducts,
  removeAllFromCart,
  updateQuantity,
} from '../controllers/cart.controller.js';
import authCheck from '../middleware/authCheck.js';

const router = express.Router();

router.use(authCheck);

router.get('/', getCartProducts);
router.post('/', addToCart);
router.put('/:id', updateQuantity);
router.delete('/', removeAllFromCart);

export default router;
