const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Review = mongoose.model('Review', {
  title: String,
  content: String,
  babysatterId: { type: Schema.Types.ObjectId, ref: 'Babysatter' }
});


module.exports = Review
