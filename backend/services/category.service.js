import {
  deleteImageFromCloudinary,
  getCategoryOrFail,
  storeImageToCloudinary,
  validateCategoryDeletion,
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
          from: 'products',
          localField: '_id',
          foreignField: 'category',
          as: 'products',
        },
      },
      {
        $match: {
          products: { $ne: [] },
        },
      },
      {
        $project: {
          products: 0,
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

  async updateCategory(categoryId, name, image) {
    const category = getCategoryOrFail(categoryId);

    let imageUrl = category.image;
    if (image) {
      await deleteImageFromCloudinary(category.image);
      imageUrl = await storeImageToCloudinary(image);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, image: imageUrl },
      { new: true }
    );

    return updatedCategory;
  },

  async deleteCategory(categoryId) {
    const category = getCategoryOrFail(categoryId);

    await validateCategoryDeletion(categoryId);

    if (category.image) {
      await deleteImageFromCloudinary(category.image);
    }

    await Category.findByIdAndDelete(categoryId);
  },
};
