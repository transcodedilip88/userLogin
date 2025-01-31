const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const validate = require('../validation/categoryValidatio')
const authValidation = require('../middleware/jwt')

router.post("/create", validate.createCategory,categoryController.createCategory);
router.get("/all", validate.getAllCategories,categoryController.getAllCategories);
router.get("/by/:id", validate.getCategoryById,categoryController.getCategorybyid);
router.patch("/category/:id", validate.updateCategory, categoryController.updateCategory);

module.exports = router;

