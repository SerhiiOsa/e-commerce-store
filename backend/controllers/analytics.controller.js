import analyticsService from '../services/analytics.service.js';
import { asyncHandler } from './asyncHandler.js';

export const getAnaliticsData = asyncHandler(async function getAnaliticsData(
  req,
  res
) {
  const period = req.query.period || null;
  const { analyticsData, dailySalesData } =
    await analyticsService.getAnaliticsData(period);

  res.status(200).json({ analyticsData, dailySalesData });
});
