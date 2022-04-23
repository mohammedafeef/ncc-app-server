const { BadRequest, NotFound } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");
const { bucket } = require("../helpers/firebaseClient");
const galleryService = require("../services/galleryService");
const ImageUploadService = require("../services/imageUploadService");
//get all the gallery
async function getGallery(req, res, next) {
  try {
    const achievements = await galleryService.getGallery();
    res.send(achievements);
  } catch (err) {
    next(err);
  }
}
//get a gallery details
async function getGalleryById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //get gallery details from database
    const gallery = await galleryService.getGalleryById(id);
    if (!gallery) {
      return next(new NotFound(responseMessages.EVENT_NOT_FOUND));
    }
    res.send(gallery);
  } catch (err) {
    next(err);
  }
}

//To add new gallery
async function addGallery(req, res, next) {
  try {
    const { title } = req.body;
    if (!title) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    const galleryData = {
      title,
    };
    //add gallery to database
    const gallery = await galleryService.addGallery(galleryData);
    res.send(gallery);
  } catch (err) {
    next(err);
  }
}

//Update a gallery details
async function updateGallery(req, res, next) {
  try {
    const { id } = req.params;
    const galleryUpdates = req.body;
    if (!id || !galleryUpdates) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    //update gallery details in database
    await galleryService.updateGallery(
      id,
      galleryUpdates
    );
    res.send(responseMessages.EVENT_UPDATED);
  } catch (err) {
    next(err);
  }
}
//Delete a gallery
async function deleteGallery(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //delete gallery from database
    await galleryService.deleteGallery(id);
    res.send(responseMessages.EVENT_DELETED);
  } catch (err) {
    next(err);
  }
}
//upload gallery images
async function uploadGalleryImage(req, res, next) {
  try {
    const { id } = req.params;
    const image = req.file;
    if (!id || !image) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //check this gallery exists
    const gallery = await galleryService.getGalleryById(id);
    if (!gallery) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //upload image to firebase storage
    const blob = bucket.file(`images/achivement/${id}`);
    const imageUrl = await ImageUploadService.uploadImage(blob, image);
    //update imageurl gallery collection
    const updatedGalleryData = {
      ...gallery,
      image: imageUrl,
    };
    await galleryService.updateGallery(id, updatedGalleryData);
    res.send(updatedGalleryData);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGallery,
  getGalleryById,
  addGallery,
  updateGallery,
  deleteGallery,
  uploadGalleryImage,
};
