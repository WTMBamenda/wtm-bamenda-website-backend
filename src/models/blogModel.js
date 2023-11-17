const mongoose = require('mongoose');

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, 
{
  timestamps: true
});

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: [commentSchema], // Embed the Comment schema as a sub-document
}, {
  timestamps: true,
});

// Create the model from the schema
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
