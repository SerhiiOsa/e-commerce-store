import { asyncHandler } from './asyncHandler.js';
import productService from '../services/product.service.js';

export const getAllProducts = asyncHandler(async function getAllProducts(
  req,
  res
) {
  const products = await productService.getAllProducts();
  res.status(200).json({ products });
});

export const getProductById = asyncHandler(async function getProductById(
  req,
  res
) {
  const productId = req.params.id;

  const product = await productService.getProductById(productId);
  res.status(200).json({ product });
});

export const getFeaturedProducts = asyncHandler(
  async function getFeaturedProducts(req, res) {
    const featuredProducts = await productService.getFeaturedProducts();
    res.status(200).json({ products: featuredProducts });
  }
);

export const createProduct = asyncHandler(async function createProduct(
  req,
  res
) {
  const { name, description, price, image, category } = req.body;

  const product = await productService.createProduct(
    name,
    description,
    price,
    image,
    category
  );

  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async function updateProduct(
  req,
  res
) {
  const productId = req.params.id;
  const { name, description, price, image, category } = req.body;

  const updatedProduct = await productService.updateProduct(
    productId,
    name,
    description,
    price,
    category,
    image
  );

  res.status(201).json(updatedProduct);
});

export const deleteProduct = asyncHandler(async function deleteProduct(
  req,
  res
) {
  const productId = req.params.id;
  await productService.deleteProduct(productId);

  res.status(200).json({ message: 'Product deleted successfully' });
});

export const getRecommendedProducts = asyncHandler(
  async function getRecommendedProducts(req, res) {
    const products = await productService.getRecommendedProducts();
    res.status(200).json({ products });
  }
);

export const getProductsByCategory = asyncHandler(
  async function getProductsByCategory(req, res) {
    const category = req.params.category;
    const products = await productService.getProductsByCategory(category);

    res.status(200).json({ products });
  }
);

export const toggleFeaturedProduct = asyncHandler(
  async function toggleFeaturedProduct(req, res) {
    const productId = req.params.id;
    const updatedProduct = await productService.toggleFeaturedProduct(
      productId
    );

    res.status(200).json(updatedProduct);
  }
);
