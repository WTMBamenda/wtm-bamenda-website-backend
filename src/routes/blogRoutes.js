const express = require('express');
const { body } = require('express-validator');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for blog posts
const blogPostValidationRules = [
  body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('content').notEmpty().withMessage('Content cannot be empty'),
];

// Validation rules for comments
const commentValidationRules = [
  body('text').notEmpty().withMessage('Text cannot be empty'),
];

// Routes for Blog Posts
router.post('/', [authMiddleware.protect, blogPostValidationRules], blogController.createBlogPost);
router.get('/', blogController.getAllBlogPosts);
router.get('/:id', blogController.getBlogPost);
router.patch('/:id', [authMiddleware.protect, blogPostValidationRules], blogController.updateBlogPost);
router.delete('/:id', authMiddleware.protect, blogController.deleteBlogPost);

// Routes for Comments on Blog Posts
router.post('/:blogPostId/comments', [authMiddleware.protect, commentValidationRules], blogController.addComment);
router.patch('/:blogPostId/comments/:commentId', [authMiddleware.protect, commentValidationRules], blogController.updateComment);
router.delete('/:blogPostId/comments/:commentId', authMiddleware.protect, blogController.deleteComment);

module.exports = router;
