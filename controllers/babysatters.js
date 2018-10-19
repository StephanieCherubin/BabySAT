const express = require('express');
const app = express();
const Babysatter = require('../models/babysatter.js')
const Review = require('../models/review.js');
var admin = require('../app')

// INDEX
  app.get('/', (req, res) => {
    Babysatter.find()
      .then(babysatters => {
        res.render('babysatters-index', {babysatters: babysatters});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // NEW
    app.get('/babysatters/new', (req, res) => {
      res.render('babysatters-new', {});
    })

    // CREATE
    app.post('/babysatters', (req, res) => {
      Babysatter.create(req.body)
      .then((babysatter) => {
        console.log(babysatter);
        res.redirect(`/babysatters/${babysatter._id}`)
      }).catch((err) => {
        console.log(err.message);
      })
    })

    // SHOW
    app.get('/babysatters/:id', (req, res) => {
      Babysatter.findById(req.params.id).then((babysatter) => {
         Review.find({ babysatterId: req.params.id }).then(reviews => {
        if (admin == false) {
        res.render('babysatters-show', { babysatter: babysatter, reviews: reviews });
        } else {
        res.render('babysatters-show-admin', { babysatter: babysatter, reviews: reviews })
        }
    })
      }).catch((err) => {
        console.log(err.message);
        });
    });

    // EDIT
    app.get('/babysatters/:id/edit', (req, res) => {
      Babysatter.findById(req.params.id, function(err, babysatter) {
        res.render('babysatters-edit', {babysatter: babysatter});
      })
    });

    // UPDATE
    app.put('/babysatters/:id', (req, res) => {
      Babysatter.findByIdAndUpdate(req.params.id, req.body)
        .then(babysatter => {
          res.redirect(`/babysatters/${babysatter._id}`)
        })
        .catch(err => {
          console.log(err.message)
      });
    });

// // DELETE
//     app.delete('/babysatters/:id', function (req, res) {
//       console.log("DELETE babysatter")
//       Babysatter.findByIdAndRemove(req.params.id).then((babysatter) => {
//         res.redirect('/');
//       }).catch((err) => {
//         console.log(err.message);
//         });
//     });
}

module.exports = app;