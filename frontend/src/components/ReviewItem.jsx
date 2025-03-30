import { Pencil, Trash, MessageSquareText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useReviewStore } from '../stores/useReviewStore';
import EditReview from './modals/EditReview';
import CreateComment from './modals/CreateComment';
import { useState } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { useUserStore } from '../stores/useUserStore';
import CommentItem from './CommentItem';

const ReviewItem = ({ review }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditReviewModalOpen, setIsEditReviewModalOpen] = useState(false);
  const [isCreateCommentModalOpen, setIsCreateCommentModalOpen] =
    useState(false);

  const { fetchOneProduct, product } = useProductStore();
  const { user } = useUserStore();
  const { deleteReview, loading } = useReviewStore();

  const handleEditReview = (review) => {
    setSelectedReview(review);
    setIsEditReviewModalOpen(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (loading) {
      return;
    }
    await deleteReview(reviewId);
    await fetchOneProduct(product._id);
  };

  const handleCreateComment = (review) => {
    if (!user) {
      toast.error('Please login to reply on the review');
      return;
    }
    setSelectedReview(review);
    setIsCreateCommentModalOpen(true);
  };

  return (
    <>
      <div className="w-full border border-emerald-900 p-1 rounded-xl shadow-md mb-4">
        <p className="text-sm font-semibold text-emerald-300  mb-4 sm:mb-0">
          {review.user.name}
        </p>
        <p className="mt-2 text-sm text-emerald-500  mb-4 sm:mb-0">
          {review.text}
        </p>
        <div className="flex justify-between mt-2">
          <button
            className="text-sm text-gray-500 cursor-pointer hover:text-gray-300 flex gap-0.5 items-center"
            onClick={() => handleCreateComment(review)}
          >
            <MessageSquareText size={16} />
            Reply
          </button>
          <div className="flex gap-3">
            {user?._id === review.user._id && (
              <button
                className="text-sm text-gray-500 cursor-pointer hover:text-yellow-400 flex gap-0.5 items-center"
                onClick={() => handleEditReview(review)}
              >
                <Pencil size={16} />
                Edit
              </button>
            )}

            {(user?._id === review.user._id || user?.role === 'admin') && (
              <button
                className="text-sm text-gray-500 cursor-pointer hover:text-red-400 flex gap-0.5 items-center"
                onClick={() => handleDeleteReview(review._id)}
              >
                <Trash size={16} />
                Delete
              </button>
            )}
          </div>
        </div>

        <CreateComment
          show={isCreateCommentModalOpen}
          handleClose={() => setIsCreateCommentModalOpen(false)}
          productId={product?._id}
          reviewId={selectedReview?._id}
        />

        <EditReview
          show={isEditReviewModalOpen}
          handleClose={() => setIsEditReviewModalOpen(false)}
          productId={product?._id}
          review={selectedReview}
        />
      </div>

      {review?.comments.length > 0 && (
        <div className="flex mb-4">
          <div className="w-4 border-l-2 border-emerald-900"></div>
          <div className="w-full border border-emerald-900  rounded-xl shadow-md">
            {review?.comments.map((comment, index) => (
              <CommentItem
                review={review}
                comment={comment}
                index={index}
                key={comment._id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewItem;
