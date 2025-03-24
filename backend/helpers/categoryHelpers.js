import cloudinary from '../config/cloudinary.js';
import Category from '../models/category.model.js';
import Product from '../models/product.model.js';

export const storeImageToCloudinary = async (image) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: 'categories',
    });

    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const deleteImageFromCloudinary = async (image) => {
  try {
    const publicId = image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`categories/${publicId}`);
  } catch (error) {
    console.error(error);
  }
};

export const validateCategoryDeletion = async (categoryId) => {
  const productCount = await Product.countDocuments({ category: categoryId });
  if (productCount > 0) {
    const error = new Error('Used category cannot be deleted');
    error.statusCode = 400;
    throw error;
  }
};

export const getCategoryOrFail = async (categoryId) => {
  const category = await Category.findById(categoryId);

  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  return category;
};
