const mongoose = require('mongoose');

const Babysatter = mongoose.model('Babysatter', {
  title: String,
  description: String,
});

module.exports = Babysatter;
