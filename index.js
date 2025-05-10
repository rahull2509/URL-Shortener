const express = require("express"); // Importing Express to create the server
const path = require('path'); // Importing Path module to handle file paths
const { connectToMongoDB } = require("./connect"); // Importing the MongoDB connection function
const urlRoute = require("./routes/url"); // Importing URL-related routes
const staticRoute = require('./routes/staticRouter'); // Importing static routes for rendering views
const URL = require("./models/URL"); // Importing the URL model for database operations

const app = express(); // Creating an Express application
const PORT = 8001; // Defining the port for the server

// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("Connected to MongoDB!")) // Log success message on successful connection
  .catch((err) => console.error("Failed to connect to MongoDB", err)); // Log error if connection fails

// Set EJS as the view engine
app.set("view engine", "ejs"); // Setting EJS as the template engine
app.set("views", path.resolve("./views")); // Setting the views directory

// Middleware to parse JSON and URL-encoded data
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded request bodies

// Routes
app.use("/url", urlRoute); // Mount URL-related routes at "/url"
app.use("/", staticRoute); // Mount static routes at the root "/"

// Route to handle redirection for short URLs
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId; // Extract the short ID from the request parameters
  const entry = await URL.findOneAndUpdate(
    { shortId }, // Find the URL entry by short ID
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(), // Add the current timestamp to the visit history
        },
      },
    }
  );

  if (!entry) {
    // If no entry is found, return a 404 error
    return res.status(404).send("Short URL not found");
  }

  // Redirect to the original URL
  res.redirect(entry.redirectURL);
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`)); // Log a message when the server starts
