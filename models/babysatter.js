const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BabysatterSchema = new Schema({
  title: String,
  description: String,
});

module.exports = mongoose.model('Babysatter', BabysatterSchema);
