import { useState, useRef, useEffect } from 'react';
import { Loader, BookPlus } from 'lucide-react';
import { useReviewStore } from '../../stores/useReviewStore';
import { useProductStore } from '../../stores/useProductStore';

const CreateReview = ({ show, handleClose, productId }) => {
  const dialogRef = useRef(null);
  const [reviewData, setreviewData] = useState({ text: '', productId });

  const { addReviewToProduct, loading } = useReviewStore();
  const { fetchOneProduct } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReviewToProduct(reviewData);
    await fetchOneProduct(productId);
    setreviewData({ text: '', productId });
    handleClose();
  };

  useEffect(() => {
    if (show) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [show]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 bg-black/50"
      onClick={(e) => e.target === dialogRef.current && handleClose()}
      onCancel={handleClose}
    >
      <div
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-3xl 
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Write your review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Text
            </label>
            <textarea
              type="text"
              id="name"
              name="text"
              value={reviewData.text}
              onChange={(e) =>
                setreviewData({ ...reviewData, text: e.target.value })
              }
              rows="5"
              maxLength={1000}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <button
            type="submit"
            className="flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Publishing...
              </>
            ) : (
              <>
                <BookPlus className="mr-2 h-5 w-5" />
                Publish
              </>
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default CreateReview;
