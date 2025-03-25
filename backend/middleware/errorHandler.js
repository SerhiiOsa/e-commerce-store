export default (err, req, res, next) => {
  console.error(`Error in ${err.controllerName}: `, err.message);

  const statusCode = err.statusCode || 500;
  const isExpectedError = statusCode >= 400 && statusCode < 500;

  const message = isExpectedError ? err.message : 'Something went wrong';

  res.status(statusCode).json({ error: message });
};
