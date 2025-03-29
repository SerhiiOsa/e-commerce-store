import { motion } from 'framer-motion';
import { useProductStore } from '../stores/useProductStore';
import CreateReview from './modals/CreateReview';
import { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import { Pencil, Trash, MessageSquareText } from 'lucide-react';
import { useReviewStore } from '../stores/useReviewStore';
import EditReview from './modals/EditReview';

const ReviewsTab = () => {
  const [selectedReview, setSelectedReview] = useState(null);
  const { fetchOneProduct, product } = useProductStore();
  const { deleteReview, loading } = useReviewStore();
  const { user } = useUserStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleShowModal = () => {
    if (!user) {
      toast.error('Please login to leave reviews about our products');
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (reviewId) => {
    if (loading) {
      return;
    }
    await deleteReview(reviewId);
    await fetchOneProduct(product._id);
  };

  return (
    <div className="mt-6 sm:mt-8 md:gap-4 lg:flex lg:flex-col lg:items-start xl:gap-6 px-4">
      <motion.h4
        className="text-center text-2xl sm:text-3xl font-semibold text-emerald-500 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Reviews of our customers about{' '}
        <span className="text-emerald-600">{product?.name}</span>
      </motion.h4>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <div
          className="flex flex-col sm:flex-row justify-between items-center  
        border border-emerald-900 rounded-xl p-5 shadow-md mb-4"
        >
          <p className="text-base text-emerald-700 font-medium mb-4 sm:mb-0">
            Leave your review about{' '}
            <span className="font-semibold">{product?.name}</span>
          </p>
          <button
            className="bg-emerald-500 hover:bg-emerald-600 text-white 
          font-semibold px-5 py-2 rounded-xl shadow-md transition duration-300 cursor-pointer"
            onClick={handleShowModal}
          >
            Write a review
          </button>
        </div>

        <CreateReview
          show={isCreateModalOpen}
          handleClose={() => setIsCreateModalOpen(false)}
          productId={product?._id}
        />

        {product?.reviews.map((review) => (
          <div
            key={review._id}
            className="w-full border border-emerald-900 p-1 rounded-xl shadow-md mb-2"
          >
            <p className="text-sm font-semibold text-emerald-300  mb-4 sm:mb-0">
              {review.user.name}
            </p>
            <p className="mt-2 text-sm text-emerald-500  mb-4 sm:mb-0">
              {review.text}
            </p>
            <div className="flex justify-between mt-2">
              <button className="text-sm text-gray-500 cursor-pointer hover:text-gray-300 flex gap-0.5 items-center">
                <MessageSquareText size={16} />
                Reply
              </button>
              <div className="flex gap-3">
                {user?._id === review.user._id && (
                  <button
                    className="text-sm text-gray-500 cursor-pointer hover:text-yellow-400 flex gap-0.5 items-center"
                    onClick={() => handleEdit(review)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                )}

                {(user?._id === review.user._id || user?.role === 'admin') && (
                  <button
                    className="text-sm text-gray-500 cursor-pointer hover:text-red-400 flex gap-0.5 items-center"
                    onClick={() => handleDelete(review._id)}
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                )}
              </div>
            </div>

            <EditReview
              show={isEditModalOpen}
              handleClose={() => setIsEditModalOpen(false)}
              productId={product?._id}
              review={selectedReview}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewsTab;
