const { BadRequest, NotFound } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");
const { bucket } = require("../helpers/firebaseClient");
const achivementService = require("../services/achievementService");
const ImageUploadService = require("../services/imageUploadService");
//get all the events
async function getAllAchievements(req, res, next) {
  try {
    const achievements = await achivementService.getAllAchievements();
    res.send(achievements);
  } catch (err) {
    next(err);
  }
}
//get a event details
async function getAchievementById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //get event details from database
    const achievement = await achivementService.getAchievementById(id);
    if (!achievement) {
      return next(new NotFound(responseMessages.EVENT_NOT_FOUND));
    }
    res.send(achievement);
  } catch (err) {
    next(err);
  }
}

//To add new event
async function addAchievement(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    const achievementData = {
      title,
    };
    //add event to database
    const event = await achivementService.addAchievement(achievementData);
    res.send(event);
  } catch (err) {
    next(err);
  }
}

//Update a event details
async function updateAchievement(req, res, next) {
  try {
    const { id } = req.params;
    const eventUpdates = req.body;
    if (!id || !eventUpdates) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    //update event details in database
    await achivementService.updateAchievement(
      id,
      eventUpdates
    );
    res.send(responseMessages.EVENT_UPDATED);
  } catch (err) {
    next(err);
  }
}
//Delete a event
async function deleteAchievement(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //delete event from database
    await achivementService.deleteAchievement(id);
    res.send(responseMessages.EVENT_DELETED);
  } catch (err) {
    next(err);
  }
}
//upload event images
async function uploadAchievementImage(req, res, next) {
  try {
    const { id } = req.params;
    const image = req.file;
    if (!id || !image) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //check this event exists
    const event = await achivementService.getAchievementById(id);
    if (!event) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //upload image to firebase storage
    const blob = bucket.file(`images/achivement/${id}`);
    const imageUrl = await ImageUploadService.uploadImage(blob, image);
    //update imageurl event collection
    const updatedAchievementData = {
      ...event,
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
