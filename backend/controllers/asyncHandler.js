export const asyncHandler = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      error.controllerName = `${controller.name} controller`;
      next(error);
    }
  };
};
