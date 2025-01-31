const Joi = require("joi");

const updateuser = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().optional(),
      firstName: Joi.string().optional(),
      lastName: Joi.string().optional(),
      contactNumber: Joi.number().optional(),
      isBlocked: Joi.boolean().optional(),
      isDeleted: Joi.boolean().optional(),
    });
    const value = await schema.validateAsync(req.body);
    req.body = value;
    next();
  } catch (error) {
    next(new error.validationError(error));
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const schema = Joi.object({
      skip: Joi.number().optional(),
      limit: Joi.number().optional(),
      search: Joi.number().optional(),
    });
    req.query = await schema.validateAsync(req.query);
    next();
  } catch (error) {
    next(new error.validationError(error));
  }
};

const getUserById = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().required(),
    });
    req.params = await schema.validateAsync(req.params);
    next();
  } catch (error) {
    next(new error.validationError(error));
  }
};

module.exports = {
  updateuser,
  getAllUsers,
  getUserById,
};
