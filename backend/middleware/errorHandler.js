export default (err, req, res, next) => {
  console.error(`Error in ${err.errorSource}: `, err.message);

  let statusCode;
  if (err.message === 'Email is already taken') {
    statusCode = 400;
  } else {
    statusCode = err.statusCode || 500;
  }

  const isExpectedError = statusCode >= 400 && statusCode < 500;

  const message = isExpectedError ? err.message : 'Something went wrong';

  res.status(statusCode).json({ error: message });
};
