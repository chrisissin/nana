  const Multer = require('multer');
  
  const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });
  
  router.post(
    '/upload',
    multer.single('image'),
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
      if (req.file && req.file.gcsUrl) {
        return res.send(req.file.gcsUrl);
      }
  
      return res.status(500).send('Unable to upload');
    },
  );