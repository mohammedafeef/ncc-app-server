const { BadRequest, NotFound } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");
const { bucket } = require("../helpers/firebaseClient");
const achivementService = require("../services/achievementService");
const ImageUploadService = require("../services/imageUploadService");
//get all the achievements
async function getAllAchievements(req, res, next) {
  try {
    const achievements = await achivementService.getAllAchievements();
    res.send(achievements);
  } catch (err) {
    next(err);
  }
}
//get a achievement details
async function getAchievementById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //get achievement details from database
    const achievement = await achivementService.getAchievementById(id);
    if (!achievement) {
      return next(new NotFound(responseMessages.EVENT_NOT_FOUND));
    }
    res.send(achievement);
  } catch (err) {
    next(err);
  }
}

//To add new achievement
async function addAchievement(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    const achievementData = {
      title,
    };
    //add achievement to database
    const achievement = await achivementService.addAchievement(achievementData);
    res.send(achievement);
  } catch (err) {
    next(err);
  }
}

//Update a achievement details
async function updateAchievement(req, res, next) {
  try {
    const { id } = req.params;
    const eventUpdates = req.body;
    if (!id || !eventUpdates) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    //update achievement details in database
    await achivementService.updateAchievement(
      id,
      eventUpdates
    );
    res.send(responseMessages.EVENT_UPDATED);
  } catch (err) {
    next(err);
  }
}
//Delete a achievement
async function deleteAchievement(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //delete achievement from database
    await achivementService.deleteAchievement(id);
    res.send(responseMessages.EVENT_DELETED);
  } catch (err) {
    next(err);
  }
}
//upload achievement images
async function uploadAchievementImage(req, res, next) {
  try {
    const { id } = req.params;
    const image = req.file;
    if (!id || !image) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //check this achievement exists
    const achievement = await achivementService.getAchievementById(id);
    if (!achievement) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //upload image to firebase storage
    const blob = bucket.file(`images/achivement/${id}`);
    const imageUrl = await ImageUploadService.uploadImage(blob, image);
    //update imageurl achievement collection
    const updatedAchievementData = {
      ...achievement,
      image: imageUrl,
    };
    await achivementService.updateAchievement(id, updatedAchievementData);
    res.send(updatedAchievementData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllAchievements,
  getAchievementById,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  uploadAchievementImage,
};
