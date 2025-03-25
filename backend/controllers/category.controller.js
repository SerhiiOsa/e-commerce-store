import { asyncHandler } from './asyncHandler.js';
import categoryService from '../services/category.service.js';

export const getAllCategories = asyncHandler(async function getAllCategories(
  req,
  res
) {
  const categories = await categoryService.getAllCategories();
  res.status(200).json({ categories });
});

export const getUsedCategories = asyncHandler(async function getUsedCategories(
  req,
  res
) {
  const categories = await categoryService.getUsedCategories();
  res.status(200).json({ categories });
});

export const createCategory = asyncHandler(async function createCategory(
  req,
  res
) {
  const { name, image } = req.body;

  const category = await categoryService.createCategory(name, image);

  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async function updateCategory(
  req,
  res
) {
  const categoryId = req.params.id;
  const { name, image } = req.body;

  const updatedCategory = await categoryService.updateCategory(
    categoryId,
    name,
    image
  );

  res.status(200).json(updatedCategory);
});

export const deleteCategory = asyncHandler(async function deleteCategory(
  req,
  res
) {
  const categoryId = req.params.id;
  await categoryService.deleteCategory(categoryId);

  return res.status(200).json({ message: 'Category deleted successfully' });
});
