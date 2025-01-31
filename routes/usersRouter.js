const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const authntication = require("../middleware/jwt");
const validate = require('../validation/userValidation')

// userRoutes

router.get('/all',authntication.getAllUsers,validate.getAllUsers,userController.getAllUsers)
router.get('/:id',authntication.getUserById,validate.getUserById,userController.getUserById)
router.patch('/updateuse/:id',validate.updateuser,userController.updateuse)

module.exports = router;
