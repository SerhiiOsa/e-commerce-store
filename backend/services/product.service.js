import {
  deleteImageFromCloudinary,
  getStoredFeaturedProducts,
  storeFeaturedProducts,
  storeImageToCloudinary,
} from '../helpers/productHelpers.js';
import Product from '../models/product.model.js';

export default {
  async getAllProducts() {
    return await Product.find().populate('category', 'name');
  },

  async getFeaturedProducts() {
    let featuredProducts = await getStoredFeaturedProducts();
    if (featuredProducts) {
      return featuredProducts;
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (featuredProducts.length === 0) {
      const error = new Error('No featured products found');
      error.statusCode = 404;
      throw error;
    }

    await storeFeaturedProducts(featuredProducts);
    return featuredProducts;
  },

  async createProduct(name, description, price, image, category) {
    let imageUrl = '';
    if (image) {
      imageUrl = await storeImageToCloudinary(image);
    }

    const product = await Product.create({
      name,
      description,
      price,
      image: imageUrl,
      category,
    });

    return product;
  },

  async deleteProduct(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    if (product.image) {
      await deleteImageFromCloudinary(product.image);
    }

    await Product.findByIdAndDelete(productId);

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await storeFeaturedProducts(featuredProducts);
  },

  async getRecommendedProducts() {
    const products = await Product.aggregate([
      { $sample: { size: 3 } },
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    return products;
  },

  async getProductsByCategory(category) {
    return await Product.find({ category });
  },

  async toggleFeaturedProduct(productId) {
    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await storeFeaturedProducts(featuredProducts);

    return updatedProduct;
  },
};
