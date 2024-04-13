const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  profileUrl: { type: String, required: true },
  photos: { type: String, required: true }
});

userSchema.index({ githubId: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
