const ImageService = require("../services/imageService");
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
      return ApiResponses.error(res, error.message);
    }
  }

  // Method for fetching all images
  async getAllImages(req, res) {
    try {
      const images = await ImageService.getAllImages();
      return ApiResponses.success(res, "Images retrieved successfully", images);
    } catch (error) {
      return ApiResponses.error(res, error.message);
    }
  }
}

module.exports = new ImageController();
