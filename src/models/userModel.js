const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, 
{
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Hash the password with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
