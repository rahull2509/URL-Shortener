const shortid = require("shortid"); // Library to generate unique short IDs
const URL = require("../models/URL"); // Importing the URL model for database operations

// Handler to generate a new short URL
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  // Validate if the URL is provided in the request body
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  // Generate a unique short ID for the URL
  const shortId = shortid();

  // Save the new short URL in the database
  await URL.create({
    shortId: shortId, // The generated short ID
    redirectURL: body.url, // The original URL to redirect to
    visitHistory: [], // Initialize visit history as an empty array
  });

  // Render the home page with the list of all URLs
  return res.render("home", {
    id: shortId, // Pass the generated short ID to the view
    urls: await URL.find({}), // Fetch all URLs from the database
  });
}

// Handler to get analytics for a specific short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId; // Extract the short ID from the request parameters

  // Find the short URL in the database
  const result = await URL.findOne({ shortId });
  if (!result) {
    // Return 404 if the short URL is not found
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Return the analytics data (total clicks and visit history)
  return res.json({
    totalClicks: result.visitHistory.length, // Total number of clicks on the short URL
    analytics: result.visitHistory, // Array of visit history (timestamps)
  });
}

// Handler to delete a specific short URL
async function handleDeleteShortURL(req, res) {
  const shortId = req.params.shortId; // Extract the short ID from the request parameters

  // Find and delete the short URL from the database
  const result = await URL.findOneAndDelete({ shortId });
  if (!result) {
    // Return 404 if the short URL is not found
    return res.status(404).json({ error: "Short URL not found" });
  }

  // Return a success message upon deletion
  return res.json({ message: "Short URL deleted successfully" });
}

// Export the handlers to be used in other parts of the application
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
};
