import { useUserStore } from '../stores/useUserStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';

const AboutProductTab = () => {
  const starCount = 5;

  const { product, rateProduct, loading } = useProductStore();
  const { user } = useUserStore();

  const getStarColor = (index) => {
    const fullStars = Math.floor(product?.rating);
    const fraction = product?.rating - fullStars;

    if (index < fullStars) {
      return 'gold';
    }

    if (index === fullStars && fraction > 0) {
      return 'part-gold';
    }

    return 'gray';
  };

  const handleRateProduct = (rate) => {
    if (!user) {
      toast.error('Please login to rate our products');
      return;
    }

    if (loading) {
      return;
    }
    rateProduct(rate, product._id);
  };
  return (
    <div className="mt-6 sm:mt-8 md:gap-3 lg:flex lg:items-start xl:gap-4">
      <motion.div
        className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-3xl"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          className="w-full max-h-[600px] object-contain rounded-lg"
          src={product?.image}
          alt="product image"
        />
      </motion.div>

      <motion.div
        className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="flex gap-20">
          <span className="text-3xl font-semibold tracking-tight text-white">
            {product?.name}
          </span>
          <span className="text-3xl font-bold text-emerald-400">
            ${product?.price}
          </span>
        </p>
        <div className="flex gap-4">
          {Array.from({ length: starCount }).map((_, i) => (
            <div key={i} className="relative w-12 h-12">
              <Star
                stroke="none"
                fill="currentColor"
                absoluteStrokeWidth
                className="text-gray-400 w-12 h-12 cursor-pointer"
                onClick={() => handleRateProduct(i + 1)}
              />

              {getStarColor(i) === 'gold' && (
                <Star
                  stroke="none"
                  fill="currentColor"
                  absoluteStrokeWidth
                  className="absolute top-0 left-0 text-yellow-400 w-12 h-12 cursor-pointer"
                  onClick={() => handleRateProduct(i + 1)}
                />
              )}

              {getStarColor(i) === 'part-gold' && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${(product?.rating % 1) * 100}%` }}
                >
                  <Star
                    stroke="none"
                    fill="currentColor"
                    absoluteStrokeWidth
                    className="text-yellow-400 w-12 h-12 cursor-pointer"
                    onClick={() => handleRateProduct(i + 1)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xl text-gray-400">{product?.description}</p>
      </motion.div>
    </div>
  );
};

export default AboutProductTab;
