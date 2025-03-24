import { motion } from 'framer-motion';
import { useCategoryStore } from '../stores/useCategoryStore';
import { Pencil, Trash } from 'lucide-react';
import UpdateCategory from './modals/updateCategory';
import { useState } from 'react';

const CategoriesList = () => {
  const { deleteCategory, categories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <table className=" min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {categories?.map((category) => (
              <tr key={category._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={category.image}
                        alt={category.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-white">
                        {category.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="flex gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-amber-400 hover:text-amber-200 cursor-pointer">
                    <Pencil
                      className="h-5 w-5"
                      onClick={() => handleShowModal(category)}
                    />
                  </button>
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
      <UpdateCategory
        show={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoriesList;
