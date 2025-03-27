import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useProductStore = create((set, get) => ({
  products: [],
  product: null,
  loading: false,
  setProducts: (products) => set({ products }),
  setProduct: (product) => set({ product }),

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/products');
      set({ products: response.data.products, loading: false });
    } catch (error) {
      toast.error(error.response.data.error);
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchOneProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/${productId}`);
      set({ product: response.data.product, loading: false });
    } catch (error) {
      toast.error(error.response.data.error);
      set({ error: 'Failed to fetch product', loading: false });
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/products/category/${category}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      toast.error(error.response.data.error);
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/products/featured');
      set({ products: response.data.products, loading: false });
    } catch (error) {
      console.error(error.response.data.error);
      set({ error: 'Failed to fetch products', loading: false });
    }
  },

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const response = await axios.post('/products', productData);
      set((prevState) => ({
        products: [...prevState.products, response.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  updateProduct: async (id, productData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/products/${id}`, productData);
      set((prevState) => ({
        products: prevState.products.map((item) =>
          item._id === id ? response.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to delete product');
      set({ loading: false });
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      const response = await axios.patch(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) => {
          if (product._id !== productId) {
            return product;
          }
          return { ...product, isFeatured: response.data.isFeatured };
        }),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to toggle product');
      set({ loading: false });
    }
  },

  rateProduct: async (rate, productId) => {
    set({ loading: true });
    try {
      await axios.post('/rating', { rate, productId });
      set({ loading: false });
      await get().fetchOneProduct(productId);
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to rate product');
      set({ loading: false });
    }
  },
}));
