const express = require('express');
const app = express();
const Babysatter = require('../models/babysatter');
const Review = require('../models/review')

module.exports = (app, Review) => {

    app.post('/babysatters/review', (req, res) => {
      Review.create(req.body).then(review => {
        res.redirect(`/babysatters/${review.babysatterId}`);
      }).catch((err) => {
        console.log(err.message);
        });
    });

    // DELETE
    app.delete('/babysatters/review/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect(`/babysatters/${review.babysatterId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}