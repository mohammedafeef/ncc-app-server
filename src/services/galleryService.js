const { db } = require("../helpers/firebaseClient");
const constants = require("../utils/constants");
const { BadRequest } = require("../utils/errors");
async function getGallery() {
  const gallery = await db
    .collection(constants.GALLERY_COLLECTION)
    .get();
  return gallery.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}
async function getGalleryById(galleryId) {
  const gallery = await db
    .collection(constants.GALLERY_COLLECTION)
    .doc(galleryId)
    .get();
  const galleryData = gallery.data();
  if (!galleryData) {
    throw new BadRequest();
  }
  return { ...galleryData, id: gallery.id };
}
async function addGallery(data) {
  const galleryRef = db.collection(constants.GALLERY_COLLECTION).doc();
  await galleryRef.set(data);
  return galleryRef.id;
}
async function updateGallery(galleryId, data) {
  const galleryRef = db.collection(constants.GALLERY_COLLECTION).doc(galleryId);
  await galleryRef.update(data);
}
async function deleteGallery(galleryId) {
  const gallery = db
    .collection(constants.GALLERY_COLLECTION)
    .doc(galleryId);
  await gallery.delete();
}
module.exports = {
  getGallery,
  getGalleryById,
  addGallery,
  updateGallery,
  deleteGallery,
};
