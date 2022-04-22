const express = require('express');
const router = express.Router();
const controller = require('../../controllers/eventController');
router.get('/', controller.getAllEvents);
router.get('/:id', controller.getEventById);
module.exports = router;