const mongoose = require('mongoose');
const crypto = require("crypto");
const { uniqueIdTimeStamp } = require('../utils/helper/common');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  priority: String,
  status: String,
  uniqueToken: {
    type: String,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
});

taskSchema.pre('save', function(next) {
  if (this.isNew || this.isModified('uniqueToken')) {
    this.uniqueToken = crypto.randomBytes(20).toString('hex');
  }
  next();
});


module.exports = mongoose.model('Task', taskSchema)
