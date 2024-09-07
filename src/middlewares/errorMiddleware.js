// Error-handling middleware
const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
