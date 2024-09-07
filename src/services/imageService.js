const cloudinary = require("../config/cloudinary");
const sharp = require("sharp");
const Image = require("../models/image");
const AppDataSource = require("../config/database");
const ApiResponses = require("../utils/response");

class ImageService {
  // Max file size in bytes (5MB)
  static MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Allowed file formats
  static ALLOWED_FORMATS = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  async uploadProcessedImage(file, res) {
    // Check if file is provided
    if (!file) {
      return ApiResponses.error(
        res,
        "No file uploaded, please upload one",
        400
      );
    }

    // Check file size
    if (file.size > ImageService.MAX_FILE_SIZE) {
      return ApiResponses.error(res, "File exceeds maximum size of 5MB", 400);
    }

    // Check file format
    if (!ImageService.ALLOWED_FORMATS.includes(file.mimetype)) {
      return ApiResponses.error(
        res,
        "Invalid file format. Only JPEG, JPG, PNG, WEBP, and GIF are allowed",
        400
      );
    }

    // Resize and process image using Sharp (resize to 500x500 and convert to webp for optimized storage)
    const processedBuffer = await sharp(file.buffer)
      .resize(500, 500)
      .toFormat("webp") // Convert to WebP format for optimized storage
      .toBuffer();

    // Upload processed image to Cloudinary
    const processedResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ format: "webp" }, (error, result) => {
          if (error)
            return reject(new Error("Error uploading processed image"));
          resolve(result);
        })
        .end(processedBuffer);
    });

    // Save image data to the database
    const imageRepo = AppDataSource.getRepository(Image);
    const newImage = imageRepo.create({
      url: processedResult.secure_url,
      format: processedResult.format,
      width: processedResult.width,
      height: processedResult.height,
      size: processedResult.bytes,
    });
    await imageRepo.save(newImage);

    return newImage;
  }

  // Retrieve all images
  async getAllImages() {
    const imageRepo = AppDataSource.getRepository(Image);
    const images = await imageRepo.find(); // Find all images in the database
    return images;
  }
}

module.exports = new ImageService();
