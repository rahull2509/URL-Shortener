const express = require("express"); // Importing Express to create a router
const {
  handleGenerateNewShortURL, // Handler to generate a new short URL
  handleGetAnalytics, // Handler to fetch analytics for a short URL
  handleDeleteShortURL, // Handler to delete a short URL
} = require("../controllers/url"); // Importing handlers from the URL controller

const router = express.Router(); // Creating a new router instance

// Route to handle the creation of a new short URL
router.post("/", handleGenerateNewShortURL);

// Route to fetch analytics for a specific short URL
router.get("/analytics/:shortId", handleGetAnalytics);

// Route to delete a specific short URL
router.delete("/:shortId", handleDeleteShortURL);

module.exports = router; // Export the router to be used in the main application
