const Joi = require("joi");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

  if (error) {
    const message = error.details.map((d) => d.message).join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, message));
  }

  next();
};

module.exports = validate;
