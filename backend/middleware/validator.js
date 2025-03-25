import Joi from 'joi';

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(
      {
        body: req.body,
        query: req.query,
        params: req.params,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      }
    );

    if (error) {
      const errorDetails = error.details.map((err) => err.message).join(', ');
      const validationError = new Error(errorDetails);

      validationError.statusCode = 400;
      validationError.errorSource = 'requestValidator';

      return next(validationError);
    }

    next();
  };
};

export default validate;
