const multer = require('multer');
const uploadMulter = multer({
  storage: multer.memoryStorage(),
});
module.exports = uploadMulter.single('file');