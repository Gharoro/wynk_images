const express = require("express");
const imageRoutes = require("./routes/imageRoutes");
const AppDataSource = require("./config/database");

const app = express();

// Init database connection
AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware
app.use(express.json());

// Routes
app.get("/api/v1/images", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server is running successfully!" });
});
app.use("/api/v1/images", imageRoutes);

module.exports = app;
