const express = require('express');
const router = express.Router();
const authRoutes = require('./authRouter')
const categoryRoutes = require('./categoryRouter')
const userRoutes = require('./usersRouter')
/* GET home page. */
router.use('/auth',authRoutes);
router.use('/categories',categoryRoutes);
router.use('/users',userRoutes);

module.exports = router;
