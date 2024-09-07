const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const imageRoutes = require("./routes/imageRoutes");
const AppDataSource = require("./config/database");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// Initialize database connection
AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.get("/api/v1/test", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is running successfully!" });
});
app.use("/api/v1/images", imageRoutes);

// Error Middleware
app.use(errorHandler);

module.exports = app;
