const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
  title: String,
  content: String,
  babysatterId: { type: Schema.Types.ObjectId, ref: 'Babysatter' }
});


module.exports = mongoose.model('Review', ReviewSchema);
