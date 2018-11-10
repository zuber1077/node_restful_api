const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String
});

module.exports = mongoose.model('Blog', blogSchema);