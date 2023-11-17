const BlogPost = require('../models/blogModel');
const { validationResult } = require('express-validator'); // Import validationResult

// Handle creating a new blog post with validation
exports.createBlogPost = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newBlogPost = await BlogPost.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        blogPost: newBlogPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Could not create blog post',
      error: error.message,
    });
  }
};

// Handle fetching all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author');
    res.status(200).json({
      status: 'success',
      results: blogPosts.length,
      data: {
        blogPosts,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: 'Could not find blog posts',
      error: error.message,
    });
  }
};

// Get a single blog post by ID
exports.getBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author');
    if (!blogPost) {
      return res.status(404).json({
        status: 'error',
        message: 'No blog post found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        blogPost,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: 'Error fetching blog post',
      error: error.message,
    });
  }
};

// Update a blog post by ID with validation and authorization check
exports.updateBlogPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({
        status: 'error',
        message: 'No blog post found with that ID',
      });
    }

    // Check if the user is authorized to update the blog post
    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'User not authorized to update this blog post',
      });
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        blogPost: updatedBlogPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error updating blog post',
      error: error.message,
    });
  }
};

// Delete a blog post by ID with authorization check
exports.deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({
        status: 'error',
        message: 'No blog post found with that ID',
      });
    }

    // Check if the user is authorized to delete the blog post
    if (blogPost.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'User not authorized to delete this blog post',
      });
    }

    await blogPost.remove();
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error deleting blog post',
      error: error.message,
    });
  }
};

// Add a comment to a blog post with validation
exports.addComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const blogPost = await BlogPost.findById(req.params.blogPostId);
      if (!blogPost) {
        return res.status(404).json({ status: 'error', message: 'Blog post not found' });
      }
  
      const newComment = { text: req.body.text, author: req.user._id };
      blogPost.comments.push(newComment);
      await blogPost.save();
  
      res.status(201).json({ status: 'success', data: { blogPost } });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error adding comment', error: error.message });
    }
  };
  
  // Update a comment in a blog post with validation
  exports.updateComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { blogPostId, commentId } = req.params;
      const blogPost = await BlogPost.findById(blogPostId);
      if (!blogPost) {
        return res.status(404).json({ status: 'error', message: 'Blog post not found' });
      }
  
      const comment = blogPost.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ status: 'error', message: 'Comment not found' });
      }
  
      comment.text = req.body.text;
      await blogPost.save();
  
      res.status(200).json({ status: 'success', data: { blogPost } });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error updating comment', error: error.message });
    }
  };
  
  // Delete a comment from a blog post
  exports.deleteComment = async (req, res) => {
    try {
      const { blogPostId, commentId } = req.params;
      const blogPost = await BlogPost.findById(blogPostId);
      if (!blogPost) {
        return res.status(404).json({ status: 'error', message: 'Blog post not found' });
      }
  
      const comment = blogPost.comments.id(commentId);
      if (!comment) {
        return res.status(404).json({ status: 'error', message: 'Comment not found' });
      }
  
      comment.remove();
      await blogPost.save();
  
      res.status(200).json({ status: 'success', data: { blogPost } });
    } catch (error) {
      res.status(400).json({ status: 'error', message: 'Error deleting comment', error: error.message });
    }
  };
