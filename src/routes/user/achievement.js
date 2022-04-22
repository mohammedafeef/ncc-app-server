const express = require("express");
const router = express.Router();
const controller = require("../../controllers/achievementController");
const authMiddleware = require("../../middlewares/AuthMiddleware");
const multerMiddleware = require("../../middlewares/MulterMiddleware");
router.post("/", authMiddleware, controller.addAchievement);
router.patch("/:id", authMiddleware, controller.updateAchievement);
router.patch(
  "/:id/upload",
  authMiddleware,
  multerMiddleware,
  controller.uploadAchievementImage
);
router.delete("/:id", authMiddleware, controller.deleteAchievement);
module.exports = router;
