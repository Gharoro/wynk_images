const multer = require("multer");
const path = require("path");
const imageService = require("../services/imageService");

// Set up multer to store files in memory
const storage = multer.memoryStorage();

// File type and size validation
const fileFilter = (req, file, cb) => {
  // Accept only images
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, WEBP, and GIF are allowed."
      )
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: imageService.MAX_FILE_SIZE }, // Limit file size to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;
