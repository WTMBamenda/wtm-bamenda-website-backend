// Importing the required modules
const express = require('express');

// Initialize the express application
const app = express();

// Import route modules
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const blogRoutes = require('./routes/blogRoutes');

// Middlewares
// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Route configurations
app.use('/api/users', userRoutes); // Prefix for user-related routes
app.use('/api/events', eventRoutes); // Prefix for event-related routes
app.use('/api/blogs', blogRoutes); // Prefix for blog-related routes

// Temporary route to test setup
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// Export the app for use in server.js
module.exports = app;
