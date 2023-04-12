const multer = require("multer");

// Config multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // const ext = file.mimetype.split("/")[1];
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
});

module.exports = upload;
