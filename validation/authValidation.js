const Joi = require("joi");

const signup = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    contactNumber: Joi.number().required(),
    isBlocked:Joi.boolean(),
    isDeleted:Joi.boolean(),
  });
  const value = await schema.validateAsync(req.body);
  req.body = value;
  next();
};

const forgotPassword = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const value = await schema.validateAsync(req.body);
  req.body = value;
  next();
};

const login = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    next(new error.ValidationError(error));
  }
};
const resetPassword = async (req, res, next) => {
  try {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    });
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    next(new error.ValidationError(error));
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
};
