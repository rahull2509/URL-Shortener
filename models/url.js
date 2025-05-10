const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

// ✅ Safe model creation to avoid OverwriteModelError
const URL = mongoose.models.URL || mongoose.model("URL", urlSchema);

module.exports = URL;

