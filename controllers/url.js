const shortid = require("shortid");
const URL = require("../models/URL");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", {
    id: shortId,
    urls: await URL.find({}),
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// New delete handler
async function handleDeleteShortURL(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndDelete({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Short URL not found" });
  }
  return res.json({ message: "Short URL deleted successfully" });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
};
