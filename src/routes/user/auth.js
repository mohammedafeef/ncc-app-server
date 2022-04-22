const express = require('express');
const router = express.Router();
const controller = require('../../controllers/AuthController');
const authMiddleware = require('../../middlewares/AuthMiddleware');
router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
// router.get('/profile', authMiddleware, controller.getProfile);
module.exports = router;