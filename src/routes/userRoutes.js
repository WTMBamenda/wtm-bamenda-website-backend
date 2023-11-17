const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for the register route
const registerValidationRules = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Public routes
router.post('/register', registerValidationRules, userController.register);
router.post('/login', userController.login);

// Protected routes
router.patch('/update/:id', authMiddleware.protect, userController.updateUser);
router.delete('/delete/:id', authMiddleware.protect, userController.deleteUser);

module.exports = router;
