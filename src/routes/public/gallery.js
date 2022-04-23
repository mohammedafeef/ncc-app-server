const express = require('express');
const router = express.Router();
const controller = require('../../controllers/galleryController');
router.get('/', controller.getGallery);
router.get('/:id', controller.getGalleryById);
module.exports = router;