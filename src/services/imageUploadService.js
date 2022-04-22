async function uploadImage(blob, image) {
  return new Promise((resolve, reject) => {
    const blobWriter = blob.createWriteStream({
      public: true,
      metadata: {
        contentType: image.mimetype,
      },
    });
    blobWriter.on('error', (error) => {
      reject(error);
    });
    blobWriter.on('finish', () => {
      resolve(blob.metadata.mediaLink);
    });
    blobWriter.end(image.buffer);
  });
}
module.exports = { uploadImage };