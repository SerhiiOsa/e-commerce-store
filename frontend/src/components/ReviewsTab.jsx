import { motion } from 'framer-motion';
import { useProductStore } from '../stores/useProductStore';
import CreateReview from './modals/CreateReview';
import { useState } from 'react';
import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';

import ReviewItem from './ReviewItem';

const ReviewsTab = () => {
  const { product } = useProductStore();
  const { user } = useUserStore();
  const [isCreateReviewModalOpen, setIsCreateReviewModalOpen] = useState(false);

  const handleCreateReview = () => {
    if (!user) {
      toast.error('Please login to leave reviews about our products');
      return;
    }
    setIsCreateReviewModalOpen(true);
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
            onClick={handleCreateReview}
          >
            Write a review
          </button>
        </div>

        <CreateReview
          show={isCreateReviewModalOpen}
          handleClose={() => setIsCreateReviewModalOpen(false)}
          productId={product?._id}
        />

        {product?.reviews.map((review) => (
          <ReviewItem review={review} key={review._id} />
        ))}
      </motion.div>
    </div>
  );
};

export default ReviewsTab;
