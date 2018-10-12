const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  babysitterName: String
});

module.exports = Review;