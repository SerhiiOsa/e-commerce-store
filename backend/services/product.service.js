import {
  deleteImageFromCloudinary,
  getProductOrFail,
  getStoredFeaturedProducts,
  storeFeaturedProducts,
  storeImageToCloudinary,
} from '../helpers/productHelpers.js';
import Product from '../models/product.model.js';
import Rating from '../models/rating.model.js';
import Reviews from '../models/review.model.js';

export default {
  async getAllProducts() {
    return await Product.find().populate('category', 'name');
  },

  async getProductById(productId) {
    let product = await getProductOrFail(productId);
    const rating = await Rating.getAverageRating(product._id);
    product = product.toObject();
    product.rating = rating;

    const reviews = await Reviews.find({ product: productId })
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    product.reviews = reviews;

    return product;
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

    return await product.populate('category', 'name');
  },

  async updateProduct(productId, name, description, price, category, image) {
    const product = await Product.findById(productId);

    let imageUrl = product.image;
    if (image) {
      await deleteImageFromCloudinary(product.image);
      imageUrl = await storeImageToCloudinary(image);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        image: imageUrl,
        category,
      },
      { new: true }
    ).populate('category', 'name');

    return updatedProduct;
  },

  async deleteProduct(productId) {
    const product = await getProductOrFail(productId);

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
    const product = await getProductOrFail(productId);

    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();

    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await storeFeaturedProducts(featuredProducts);

    return updatedProduct;
  },
};
