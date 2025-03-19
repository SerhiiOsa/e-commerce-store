import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';
import {
  calculateStartDate,
  getDatesInRange,
} from '../helpers/analyticsHelpers.js';

export default {
  async getAnaliticsData(period) {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const endDate = new Date();
    const startDate = calculateStartDate(period);

    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
        },
      },
    ]);

    const { totalSales, totalRevenue } = salesData[0] || {
      totalSales: 0,
      totalRevenue: 0,
    };

    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          sales: { $sum: 1 },
          revenue: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    const daylySalesDataFormatted = dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        name:
          dateArray.length <= 8
            ? date
            : date.slice(8, 11) + '.' + date.slice(5, 7),
        sales: foundData?.sales || 0,
        revenue: foundData?.revenue || 0,
      };
    });

    return {
      analyticsData: {
        users: totalUsers,
        products: totalProducts,
        totalSales,
        totalRevenue,
      },
      dailySalesData: daylySalesDataFormatted,
    };
  },
};
