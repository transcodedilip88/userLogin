const express = require("express");
const router = express.Router();
const authController = require("../controller/authController")
const authValidation = require('../validation/authValidation')

router.post("/signup",authValidation.signup,authController.signup);
router.post("/login", authValidation.login,authController.login);
router.post('/forgotPassword',authValidation.forgotPassword,authController.forgotPassword)
router.post('/resetPassword',authValidation.resetPassword,authController.resetPassword)

module.exports = router