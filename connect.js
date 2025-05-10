const mongoose = require("mongoose"); // Importing Mongoose for MongoDB connection

// Function to connect to MongoDB
async function connectToMongoDB(url) {
  return mongoose.connect(url, {
    useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
  });
}

module.exports = {
  connectToMongoDB, // Export the function to be used in other parts of the application
};
