// Load environment variables from .env file
require('dotenv').config();

// Importing the required modules
const express = require('express');
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI;
const app = require('./src/app'); // Import the express app

// Middlewares
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    // Start the server only after the database connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});