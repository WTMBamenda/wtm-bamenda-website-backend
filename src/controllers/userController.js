const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator'); // Import validationResult

// Handle user registration with validation
exports.register = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password!',
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined; // Remove the password from the output

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Login failed',
      error: error.message,
    });
  }
};

// Update User Function

// Handle updating user information
exports.updateUser = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({
          status: 'error',
          message: 'No user found with that ID',
        });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Update failed',
        error: error.message,
      });
    }
  };

// Delete User Function

// Handle deleting a user
exports.deleteUser = async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({
          status: 'error',
          message: 'No user found with that ID',
        });
      }
  
      res.status(204).json({  
        status: 'success',
        data: null,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: 'Deletion failed',
        error: error.message,
      });
    }
  };
  