const {
  initializeApp,
  cert,
  applicationDefault,
} = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const options = {
  storageBucket: `gs://${process.env.BUCKET_NAME}.appspot.com`,
};
if (process.env.SERVICE_ACCOUNT_PATH) {
  const serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH);
  options.credential = cert(serviceAccount);
} else {
  options.credential = applicationDefault();
}
initializeApp(options);
const db = getFirestore();
const bucket = getStorage().bucket();
module.exports = { db, bucket };