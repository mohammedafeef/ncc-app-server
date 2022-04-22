const { db } = require('../helpers/firebaseClient');
const constants = require('../utils/constants');
async function registerUser(data) {
  const user = db.collection(constants.USER_COLLECTION).doc();
  await user.set(data);
  return data;
}
async function getUserById(userId) {
  const user = await db.collection(constants.USER_COLLECTION).doc(userId).get();
  if (!user.exists) return undefined;
  return { id: user.id, ...user.data() };
}
async function getUserByUsername(username) {
  const users = await db
    .collection(constants.USER_COLLECTION)
    .where('username', '==', username)
    .get();
  if (!users.docs.length) return undefined;
  const user = users.docs[0];
  return { id: user.id, ...user.data() };
}
async function saveToken(data) {
  const authToken = db.collection(constants.AUTH_TOKEN_COLLECTION).doc();
  await authToken.set(data);
  return data;
}
async function getAuthTokenDetails(token) {
  const authTokens = await db
    .collection(constants.AUTH_TOKEN_COLLECTION)
    .where('token', '==', token)
    .get();
  if (!authTokens.docs.length) return undefined;
  const authToken = authTokens.docs[0];
  return { id: authToken.id, ...authToken.data() };
}
async function checkUserExists(username) {
  const user = await db
    .collection(constants.USER_COLLECTION)
    .where('username', '==', username)
    .get();
  if (user.docs.length) return user.docs[0];
  return undefined;
}
module.exports = {
  getAuthTokenDetails,
  getUserById,
  registerUser,
  getUserByUsername,
  saveToken,
  checkUserExists,
};