const mongoose = require("mongoose"); // Importing Mongoose for MongoDB operations

// Define the schema for the URL model
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String, // The unique short ID for the URL
      required: true, // This field is mandatory
      unique: true, // Ensures no duplicate short IDs
    },
    redirectURL: {
      type: String, // The original URL to redirect to
      required: true, // This field is mandatory
    },
    visitHistory: [
      {
        timestamp: { type: Number }, // Stores the timestamp of each visit
      },
    ],
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// ✅ Safe model creation to avoid OverwriteModelError
// If the model already exists, use it; otherwise, create a new one
const URL = mongoose.models.URL || mongoose.model("URL", urlSchema);

module.exports = URL; // Export the URL model for use in other parts of the application

