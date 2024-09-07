class ImageController {
  async uploadImage(req, res, next) {
    try {
      return res.status(201).json({
        success: true,
        message: "Success",
        data: {},
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = new ImageController();
