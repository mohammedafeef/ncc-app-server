const express = require("express");
const router = express.Router();
const controller = require("../../controllers/eventController");
const authMiddleware = require("../../middlewares/AuthMiddleware");
const multerMiddleware = require("../../middlewares/MulterMiddleware");
router.post("/", authMiddleware, controller.addEvent);
router.patch("/:id", authMiddleware, controller.updateEvent);
router.patch(
  "/:id/upload",
  authMiddleware,
  multerMiddleware,
  controller.uploadEventImage
);
router.patch(
  "/:id/doc/upload",
  authMiddleware,
  multerMiddleware,
  controller.uploadDocFile
);

router.delete("/:id", authMiddleware, controller.deleteEvent);
module.exports = router;
