import categoryService from '../services/category.service.js';

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error in getAllCategoriesy controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsedCategories = async (req, res) => {
  try {
    const categories = await categoryService.getUsedCategories();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Error in getAllCategoriesy controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = await categoryService.createCategory(name, image);

    res.status(201).json(category);
  } catch (error) {
    console.error('Error in createCategory controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateCategory = async (req, res) => {
  try {
  } catch (error) {
    console.error('Error in updateCategory controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await categoryService.deleteCategory(categoryId);

    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Category not found' });
    }

    console.error('Error in deleteCategory controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
