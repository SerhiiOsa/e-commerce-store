import Product from '../models/product.model.js';

export default {
  async getCartProducts(user) {
    const products = await Product.find({
      _id: { $in: user.cartItems },
    });

    const cartItems = products.map((product) => {
      const item = user.cartItems.find(
        (cartItem) => cartItem._id.toString() === product._id.toString()
      );
      return { ...product.toJSON(), quantity: item.quantity };
    });

    return cartItems;
  },

  async addToCart(user, productId) {
    const existingItem = user.cartItems.find(
      (item) => item._id.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId);
    }

    await user.save();
    return user.cartItems;
  },

  async removeAllFromCart(user, productId) {
    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    }

    await user.save();
    return user.cartItems;
  },

  async updateQuantity(user, productId, quantity) {
    const existingItem = user.cartItems.find((item) => item.id === productId);
    if (!existingItem) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter((item) => item.id !== productId);
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    return user.cartItems;
  },
};
