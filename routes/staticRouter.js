const express = require("express"); // Importing Express to create a router
const router = express.Router(); // Creating a new router instance
const URL = require("../models/URL"); // Importing the URL model for database operations

// Route to render the home page
router.get("/", async (req, res) => {
  if(!req.user) return res.redirect("/login");
    // Fetch all URLs from the database
    const allurls = await URL.find({ createdBy: req.user._id }); // Fetch URLs created by the logged-in user

    // Render the "home" view and pass the list of URLs to the template
    return res.render("home", {
      urls: allurls, // List of all URLs to be displayed on the home page
    });
});

router.get('/signup', (req, res) => {
  return res.render("signup");
});
router.get('/login', (req, res) => {
  return res.render("login");
});


module.exports = router; // Export the router to be used in the main application
