const express = require('express');
const router = express.Router();
const controller = require('../../controllers/achievementController');
router.get('/', controller.getAllAchievements);
router.get('/:id', controller.getAchievementById);
module.exports = router;