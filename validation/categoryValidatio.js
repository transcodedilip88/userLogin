const Joi = require("joi");

const createCategory = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new error.validationError(error));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().optional(),
    });
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(new error.validationError(error));
  }
};

const getAllCategories = async (req, res, next) => {
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

const getCategoryById = async (req, res, next) => {
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
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById
};
