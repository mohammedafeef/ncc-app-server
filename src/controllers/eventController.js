const { BadRequest, NotFound } = require("../utils/errors");
const responseMessages = require("../utils/responseMessages");
const { bucket } = require("../helpers/firebaseClient");
//get all the events
async function getAllEvents(req, res, next) {
  try {
    const events = await eventService.getAllEvents();
    res.send(events);
  } catch (err) {
    next(err);
  }
}
//get a event details
async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //get event details from database
    const event = await eventService.getEventById(id);
    if (!event) {
      return next(new NotFound(responseMessages.EVENT_NOT_FOUND));
    }
    res.send(event);
  } catch (err) {
    next(err);
  }
}

//To add new event
async function addEvent(req, res, next) {
  try {
    const { name, description, date } = req.body;
    if (!name || !description || !date) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //add event to database
    const event = await eventService.addEvent(name, description, date);
    res.send(event);
  } catch (err) {
    next(err);
  }
}

//Update a event details
async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const eventUpdates = req.body;
    if (!id || !eventUpdates) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }
    //update event details in database
    const event = await eventService.updateEvent(id, eventUpdates);
    res.send(responseMessages.EVENT_UPDATED);
  } catch (err) {
    next(err);
  }
}
//Delete a event
async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //delete event from database
    await eventService.deleteEvent(id);
    res.send(responseMessages.EVENT_DELETED);
  } catch (err) {
    next(err);
  }
}
//upload event images
async function uploadEventImage(req, res, next) {
  try {
    const { id } = req.params;
    const image = req.file;
    if (!id || !image) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //check this event exists
    const event = await eventService.getEventById(id);
    if (!event) {
      return next(new BadRequest(responseMessages.INVALID_REQUEST));
    }

    //upload image to firebase storage
    const blob = bucket.file(`images/event/${id}`);
    const imageUrl = await ImageUploadService.uploadImage(blob, image);

    //update imageurl event collection
    const updatedEventData = {
      ...event,
      image: imageUrl,
    };
    const updatedEvent = await eventService.updateEvent(updatedEventData);
    res.send(updatedEvent);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
  uploadEventImage,
};
