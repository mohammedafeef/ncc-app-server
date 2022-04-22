const { db } = require('../helpers/firebaseClient');
const constants = require('../utils/constants');
const { BadRequest } = require('../utils/errors');
async function getAllEvents() {
  const events = await db
    .collection(constants.EVENT_COLLECTION)
    .get();
  return events.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}
async function getEventById( eventId) {
  const event = await db
    .collection(constants.EVENT_COLLECTION)
    .doc(eventId)
    .get();
  const eventData = event.data();
  if (!eventData) {
    throw new BadRequest();
  }
  return { ...eventData, id: event.id };
}
async function addEvent(data) {
  const eventRef = db.collection(constants.EVENT_COLLECTION).doc();
  await eventRef.set(data);
  return eventRef.id;
}
async function updateEvent(eventId, data) {
  const eventRef = db
    .collection(constants.EVENT_COLLECTION)
    .doc(eventId);
  await eventRef.update(data);
}
async function deleteEvent(eventId) {
  const eventRef = db
    .collection(constants.EVENT_COLLECTION)
    .doc(eventId);
  await eventRef.delete();
}
module.exports = {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
};