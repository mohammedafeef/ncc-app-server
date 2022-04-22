const { db } = require("../helpers/firebaseClient");
const constants = require("../utils/constants");
const { BadRequest } = require("../utils/errors");
async function getAllAchievements() {
  const achievements = await db
    .collection(constants.ACHIEVEMENT_COLLECTION)
    .get();
  return achievements.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
}
async function getAchievementById(achievementId) {
  const achievement = await db
    .collection(constants.ACHIEVEMENT_COLLECTION)
    .doc(achievementId)
    .get();
  const achievementData = achievement.data();
  if (!achievementData) {
    throw new BadRequest();
  }
  return { ...achievementData, id: achievement.id };
}
async function addAchievement(data) {
  const achievementRef = db.collection(constants.ACHIEVEMENT_COLLECTION).doc();
  await achievementRef.set(data);
  return achievementRef.id;
}
async function updateAchievement(eventId, data) {
  const eventRef = db.collection(constants.ACHIEVEMENT_COLLECTION).doc(eventId);
  await eventRef.update(data);
}
async function deleteAchievement(achievementId) {
  const achievement = db
    .collection(constants.ACHIEVEMENT_COLLECTION)
    .doc(achievementId);
  await achievement.delete();
}
module.exports = {
  getAllAchievements,
  getAchievementById,
  addAchievement,
  updateAchievement,
  deleteAchievement,
};
