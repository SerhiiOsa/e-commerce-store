import cartServise from '../services/cart.servise.js';

export const getCartProducts = async (req, res) => {
  try {
    const user = req.user;

    const cartItems = await cartServise.getCartProducts(user);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error in getCartProducts controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const cartItems = await cartServise.addToCart(user, productId);

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error in addToCart controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { id: productId } = req.params;
    const { quantity } = req.body;

    const cartItems = await cartServise.updateQuantity(
      user,
      productId,
      quantity
    );

    res.status(200).json({ cartItems });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }

    console.error('Error in updateQuantity controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const cartItems = await cartServise.removeAllFromCart(user, productId);

    res.status(200).json({ cartItems });
  } catch (error) {
    console.error('Error in removeAllFromCart controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
