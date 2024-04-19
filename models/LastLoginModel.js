const mongoose = require('mongoose');

const lastLoginSchema = new mongoose.Schema({
  expiresIn: { type: Date, required: true },
  token: { type: String, required: true, index: true },
  user: { type: String, required: true}
});

const LastLogin = mongoose.model('LastLogin', lastLoginSchema);

module.exports = LastLogin;
