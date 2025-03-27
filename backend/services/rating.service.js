import Rating from '../models/rating.model.js';
import { getProductOrFail } from '../helpers/productHelpers.js';

export default {
  async rateProduct(rate, productId, userId) {
    await getProductOrFail(productId);

    await Rating.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { rate } },
      { new: true, upsert: true }
    );
  },
};
