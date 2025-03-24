import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  setCategories: (categories) => set({ categories }),

  fetchUsedCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/categories/used');
      set({ categories: response.data.categories, loading: false });
    } catch (error) {
      toast.error(error.response.data.error);
      set({ error: 'Failed to fetch categories', loading: false });
    }
  },

  fetchAllCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('/categories');
      set({ categories: response.data.categories, loading: false });
    } catch (error) {
      toast.error(error.response.data.error);
      set({ error: 'Failed to fetch categories', loading: false });
    }
  },

  createCategory: async (categoryData) => {
    set({ loading: true });
    try {
      const response = await axios.post('/categories', categoryData);
      set((prevState) => ({
        categories: [...prevState.categories, response.data],
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  updateCategory: async (id, categoryData) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/categories/${id}`, categoryData);
      set((prevState) => ({
        categories: prevState.categories.map((item) =>
          item._id === id ? response.data : item
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error);
      set({ loading: false });
    }
  },

  deleteCategory: async (categoryId) => {
    set({ loading: true });
    try {
      await axios.delete(`/categories/${categoryId}`);
      set((prevState) => ({
        categories: prevState.categories.filter(
          (category) => category._id !== categoryId
        ),
        loading: false,
      }));
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to delete category');
      set({ loading: false });
    }
  },
}));
