const ImageService = require("../services/imageService");
const logger = require("../utils/logger");
const ApiResponses = require("../utils/response");

class ImageController {
  // Method for handling image processing and uploading
  async uploadImage(req, res) {
    try {
      const imageData = await ImageService.uploadProcessedImage(req.file, res);
      return ApiResponses.success(
        res,
        "Image uploaded successfully",
        imageData
      );
    } catch (error) {
      logger.error(`Image upload failed: ${error.message}`);
      return ApiResponses.error(res, error.message);
    }
  }

  // Method for fetching all images
  async getAllImages(req, res) {
    try {
      const images = await ImageService.getAllImages();
      return ApiResponses.success(res, "Images retrieved successfully", images);
    } catch (error) {
      logger.error(`Error fetching images: ${error.message}`);
      return ApiResponses.error(res, error.message);
    }
  }
}

module.exports = new ImageController();
