import cloudinary from '../config/cloudinary.js';

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
