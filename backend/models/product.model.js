import mongoose from 'mongoose';
import Review from './review.model.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    image: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.pre('findOneAndDelete', async function (next) {
  const productId = this.getQuery()._id;
  await Review.deleteMany({ product: productId });
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;
