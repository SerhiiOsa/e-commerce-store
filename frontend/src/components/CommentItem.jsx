import { Pencil, Trash } from 'lucide-react';
import { useReviewStore } from '../stores/useReviewStore';
import { useState } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { useUserStore } from '../stores/useUserStore';
import EditComment from './modals/EditComment';

const CommentItem = ({ review, comment, index }) => {
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);

  const { fetchOneProduct, product } = useProductStore();
  const { user } = useUserStore();
  const { loading, deleteComment } = useReviewStore();

  const handleEditComment = (review, comment) => {
    setSelectedReview(review);
    setSelectedComment(comment);
    setIsEditCommentModalOpen(true);
  };

  const handleDeleteComment = async (reviewId, commentId) => {
    if (loading) {
      return;
    }
    await deleteComment(reviewId, commentId);
    await fetchOneProduct(product._id);
  };

  return (
    <>
      <div className={`${index !== 0 && 'border-t'} border-emerald-900 p-1`}>
        <p className="text-sm font-semibold text-emerald-300  mb-4 sm:mb-0">
          {comment.user.name}
        </p>
        <p className="mt-2 text-sm text-emerald-500  mb-4 sm:mb-0">
          {comment.text}
        </p>

        <div className="flex gap-3 justify-end">
          {user?._id === comment.user._id && (
            <button
              className="text-sm text-gray-500 cursor-pointer hover:text-yellow-400 flex gap-0.5 items-center"
              onClick={() => handleEditComment(review, comment)}
            >
              <Pencil size={16} />
              Edit
            </button>
          )}

          {(user?._id === comment.user._id || user?.role === 'admin') && (
            <button
              className="text-sm text-gray-500 cursor-pointer hover:text-red-400 flex gap-0.5 items-center"
              onClick={() => handleDeleteComment(review._id, comment._id)}
            >
              <Trash size={16} />
              Delete
            </button>
          )}
        </div>
      </div>

      <EditComment
        show={isEditCommentModalOpen}
        handleClose={() => setIsEditCommentModalOpen(false)}
        productId={product?._id}
        reviewId={selectedReview?._id}
        comment={selectedComment}
      />
    </>
  );
};

export default CommentItem;
