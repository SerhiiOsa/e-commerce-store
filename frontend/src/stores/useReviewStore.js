import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useReviewStore = create((set) => ({
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

  addComment: async (reviewId, commentData) => {
    set({ loading: true });
    try {
      await axios.post(`/reviews/${reviewId}/comments`, commentData);
      set({ loading: false });
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to add comment');
      set({ loading: false });
    }
  },

  editComment: async (reviewId, commentId, updatedData) => {
    set({ loading: true });
    try {
      await axios.put(
        `/reviews/${reviewId}/comments/${commentId}`,
        updatedData
      );
      set({ loading: false });
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to edit comment');
      set({ loading: false });
    }
  },

  deleteComment: async (reviewId, commentId) => {
    set({ loading: true });
    try {
      await axios.delete(`/reviews/${reviewId}/comments/${commentId}`);
      toast.success('Comment deleted successfully');
      set({ loading: false });
    } catch (error) {
      toast.error(error.response.data.error || 'Failed to delete comment');
      set({ loading: false });
    }
  },
}));
