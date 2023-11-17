const mongoose = require('mongoose');

// Define the Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Create the model from the schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
