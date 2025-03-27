import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

RatingSchema.index({ user: 1, product: 1 }, { unique: true });

RatingSchema.statics.getAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: '$product', averageRating: { $avg: '$rate' } } },
  ]);

  return result.length > 0 ? result[0].averageRating : 0;
};

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
