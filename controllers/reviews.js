const express = require('express');
const app = express();
const Babysatter = require('../models/babysatter');
const Review = require('../models/review')

//NEW
app.post('/babysatters/reviews', (req, res) => {
  Review.create(req.body).then(review => {
    console.log(review);
    res.redirect(`/babysatters/${review.babysatterId}`);
  }).catch((err) => {
    console.log(err.message);
    });
});

// DELETE
app.delete('/babysatters/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect(`/babysatters/${review.babysatterId}`);
  }).catch((err) => {
    console.log(err.message);
    });
});

module.exports = app;