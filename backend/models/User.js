const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Pre-processor function
// The function will update the data before storing in the database.
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model('User', userSchema);
