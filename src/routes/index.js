const express = require("express");
const userRouter = require('./user');
const publicRouter = require('./public');
const router = express.Router();
router.use('/public', publicRouter);
router.use('/user', userRouter);
module.exports = router;