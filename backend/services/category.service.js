import {
  deleteImageFromCloudinary,
  storeImageToCloudinary,
} from '../helpers/categoryHelpers.js';
import Category from '../models/category.model.js';

export default {
  async getAllCategories() {
    return await Category.find();
  },

  async getUsedCategories() {
    return await Category.aggregate([
      {
        $lookup: {
          from: 'products', // Назва колекції продуктів
          localField: '_id', // Поле _id у категорії
          foreignField: 'category', // Поле category у продукті (ref на Category)
          as: 'products',
        },
      },
      {
        $match: {
          products: { $ne: [] }, // Залишаємо лише категорії, які мають продукти
        },
      },
      {
        $project: {
          products: 0, // Видаляємо зайве поле products
        },
      },
    ]);
  },

  async createCategory(name, image) {
    let imageUrl = '';
    if (image) {
      imageUrl = await storeImageToCloudinary(image);
    }

    const category = await Category.create({ name, image: imageUrl });

    return category;
  },

  async deleteCategory(categoryId) {
    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }

    if (category.image) {
      await deleteImageFromCloudinary(category.image);
    }

    await Category.findByIdAndDelete(categoryId);
  },
};
