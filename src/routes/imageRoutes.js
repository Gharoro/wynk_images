const express = require("express");
const ImageController = require("../controllers/imageController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

// image upload endpoint POST /api/v1/images
router.post("/", upload.single("image"), ImageController.uploadImage);
// fetch all images endpoint GET /api/v1/images
router.get("/", ImageController.getAllImages);

module.exports = router;
