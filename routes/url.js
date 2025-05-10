const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL, // Import the delete handler
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

// New DELETE route
router.delete("/:shortId", handleDeleteShortURL);

module.exports = router;
