const Event = require('../models/eventModel');

// Handle creating a new event
exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Handle fetching all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Get a single event by its ID
exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'No event found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: 'Error fetching event',
      error: error.message,
    });
  }
};

// Update an event by its ID
exports.updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }  
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document rather than the original.
      runValidators: true, // Ensures that updates are validated just like creates.
    });
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'No event found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating event',
      error: error.message,
    });
  }
};

// Delete an event by its ID
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'No event found with that ID',
      });
    }
    // Status 204 for a successful request with no content to send back
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error deleting event',
      error: error.message,
    });
  }
};
