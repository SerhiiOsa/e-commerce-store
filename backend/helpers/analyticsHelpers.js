export const calculateStartDate = (period) => {
  if (!period) {
    return new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  if (period === 'month') {
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  }

  if (period === 'year') {
    return new Date(new Date().getFullYear(), 0, 1);
  }

  throw Error('Invalid period param');
};

export const getDatesInRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
