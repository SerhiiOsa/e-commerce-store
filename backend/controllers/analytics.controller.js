import analyticsService from '../services/analytics.service.js';

export const getAnaliticsData = async (req, res) => {
  try {
    const period = req.query.period || null;
    const { analyticsData, dailySalesData } =
      await analyticsService.getAnaliticsData(period);

    res.status(200).json({ analyticsData, dailySalesData });
  } catch (error) {
    console.error('Error in analytics controller: ', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
