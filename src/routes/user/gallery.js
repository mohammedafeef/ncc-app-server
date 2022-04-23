const express = require("express");
const router = express.Router();
const controller = require("../../controllers/galleryController");
const authMiddleware = require("../../middlewares/AuthMiddleware");
const multerMiddleware = require("../../middlewares/MulterMiddleware");
router.post("/", authMiddleware, controller.addGallery);
router.patch("/:id", authMiddleware, controller.updateGallery);
router.patch(
  "/:id/upload",
  authMiddleware,
  multerMiddleware,
  controller.uploadGalleryImage
);
router.delete("/:id", authMiddleware, controller.deleteGallery);
module.exports = router;
