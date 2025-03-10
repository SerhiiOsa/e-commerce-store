import productService from '../services/product.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error in getAllProducts controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await productService.getFeaturedProducts();

    res.status(200).json({ products: featuredProducts });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'No featured products found' });
    }

    console.error('Error in getFeaturedProducts controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    const product = await productService.createProduct(
      name,
      description,
      price,
      image,
      category
    );

    res.status(201).json(product);
  } catch (error) {
    console.error('Error in createProduct controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productService.deleteProduct(productId);

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.error('Error in deleteProduct controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await productService.getRecommendedProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.error(
      'Error in getRecommendedProducts controller: ',
      error.message
    );
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await productService.getProductsByCategory(category);

    res.status(200).json({ products });
  } catch (error) {
    console.error('Error in getProductsByCategory controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const updatedProduct = await productService.toggleFeaturedProduct(
      productId
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: 'Product not found' });
    }

    console.error('Error in toggleFeaturedProduct controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
