const express = require('express');
const { body } = require('express-validator');
const eventController = require('../controllers/eventController');

const router = express.Router();

// Validation rules for creating and updating an event
const eventValidationRules = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
];

router.post('/', eventValidationRules, eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
router.patch('/:id', eventValidationRules, eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
