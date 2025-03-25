import cartServise from '../services/cart.servise.js';
import { asyncHandler } from './asyncHandler.js';

export const getCartProducts = asyncHandler(async function getCartProducts(
  req,
  res
) {
  const user = req.user;

  const cartItems = await cartServise.getCartProducts(user);
  res.status(200).json(cartItems);
});

export const addToCart = asyncHandler(async function addToCart(req, res) {
  const user = req.user;
  const { productId } = req.body;

  const cartItems = await cartServise.addToCart(user, productId);

  res.status(200).json({ cartItems });
});

export const updateQuantity = asyncHandler(async function updateQuantity(
  req,
  res
) {
  const user = req.user;
  const { id: productId } = req.params;
  const { quantity } = req.body;

  const cartItems = await cartServise.updateQuantity(user, productId, quantity);

  res.status(200).json({ cartItems });
});

export const removeAllFromCart = asyncHandler(async function removeAllFromCart(
  req,
  res
) {
  const user = req.user;
  const { productId } = req.body;

  const cartItems = await cartServise.removeAllFromCart(user, productId);

  res.status(200).json({ cartItems });
});
