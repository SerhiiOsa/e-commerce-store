import redisClient from '../config/redis.js';
import cloudinary from '../config/cloudinary.js';

export const getStoredFeaturedProducts = async () => {
  try {
    const storedData = await redisClient.get('featured_products');
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Redis error (getStoredFeaturedProducts):', error);
  }
};

export const storeFeaturedProducts = async (products) => {
  try {
    await redisClient.set('featured_products', JSON.stringify(products));
  } catch (error) {
    console.error('Redis error (storeFeaturedProducts):', error);
  }
};

export const storeImageToCloudinary = async (image) => {
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: 'products',
    });

    return cloudinaryResponse.secure_url;
  } catch (error) {
    console.error(error);
  }
};

export const deleteImageFromCloudinary = async (image) => {
  try {
    const publicId = image.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`products/${publicId}`);
  } catch (error) {
    console.error(error);
  }
};
