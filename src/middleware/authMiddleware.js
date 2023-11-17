const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  let token;

  // Check if the token is in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in! Please log in to get access.',
    });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists.',
      });
    }

    // Grant access to the protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token. Please log in again!',
      error: error.message,
    });
  }
};
