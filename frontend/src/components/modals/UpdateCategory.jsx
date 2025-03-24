import { useState, useRef, useEffect } from 'react';
import { Loader, PlusCircle, Upload } from 'lucide-react';
import { useCategoryStore } from '../../stores/useCategoryStore';

const UpdateCategory = ({ show, handleClose, category }) => {
  const dialogRef = useRef(null);
  const [updatedData, setUpdatedData] = useState({ name: '' });

  const { updateCategory, loading } = useCategoryStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUpdatedData({ ...updatedData, image: reader.result });
      };

      reader.readAsDataURL(file); // base64
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCategory(category._id, updatedData);
    setUpdatedData({ name: '' });
    handleClose();
  };

  useEffect(() => {
    setUpdatedData({ name: category?.name || '' });
  }, [category]);

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
        className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md 
      fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h2 className="text-2xl font-semibold mb-6 text-emerald-300">
          Update Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="image"
              className="sr-only"
              accept="image/*"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="cursor-pointer bg-gray-700 py-2 px-3 border
               border-gray-600 rounded-md shadow-sm text-sm leading-4 
               font-medium text-gray-300 hover:bg-gray-600 focus:outline-none 
               focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Upload className="h-5 w-5 inline-block mr-2" />
              Upload Image
            </label>
            {updatedData.image && (
              <span className="ml-3 text-sm text-gray-400">
                Image uploaded{' '}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader
                  className="mr-2 h-5 w-5 animate-spin"
                  aria-hidden="true"
                />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" />
                Update Category
              </>
            )}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateCategory;
