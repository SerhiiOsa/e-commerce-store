import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Info, MessageCircle } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import ReviewsTab from '../components/ReviewsTab';
import AboutProductTab from '../components/AboutProductTab';

const tabs = [
  { id: 'aboutProduct', label: 'All about product', icon: Info },
  { id: 'reviews', label: 'Reviews', icon: MessageCircle },
];

const ProductPage = () => {
  const [activeTab, setActiveTab] = useState('aboutProduct');

  const { productId } = useParams();

  const { fetchOneProduct } = useProductStore();

  useEffect(() => {
    fetchOneProduct(productId);
  }, [fetchOneProduct, productId]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-2">
        <div className="flex mb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 transition-colors duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'aboutProduct' && <AboutProductTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
      </div>
    </div>
  );
};

export default ProductPage;

const Reviews = () => {
  return <div>Reviews</div>;
};
