import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useReviewStore = create((set) => {
  return {
    loading: false,

    addReviewToProduct: async (reviewData) => {
      set({ loading: true });
      try {
        await axios.post('/reviews', reviewData);
        set({ loading: false });
      } catch (error) {
        toast.error(error.response.data.error || 'Failed to write review');
        set({ loading: false });
      }
    },

    editReview: async (reviewId, updatedData) => {
      set({ loading: true });
      try {
        await axios.patch(`/reviews/${reviewId}`, updatedData);
        set({ loading: false });
      } catch (error) {
        toast.error(error.response.data.error || 'Failed to edit review');
        set({ loading: false });
      }
    },

    deleteReview: async (reviewId) => {
      set({ loading: true });
      try {
        await axios.delete(`/reviews/${reviewId}`);
        toast.success('Review deleted successfully');
        set({ loading: false });
      } catch (error) {
        toast.error(error.response.data.error || 'Failed to delete review');
        set({ loading: false });
      }
    },
  };
});
