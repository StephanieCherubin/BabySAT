const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/BabySAT');

const Review = require('./models/review')
const Babysatter = require("./models/babysatter")
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
app.listen(port);

app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

//Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// routes
// reviewController(app);
// babysatterController(app);

// Mongoose Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/babySAT";

mongoose.connect( mongoUri, { useNewUrlParser: true });

// app.listen(port, () => {
//   console.log(`App listening on ${port}`)
// });

//INDEX
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
  app.post('/', (req, res) => {
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
      res.render('babysatters-show', { babysatter: babysatter, reviews: reviews });
  })
    }).catch((err) => {
      console.log(err.message);
  });
  });

  // EDIT
  app.get('/babysatters/:id/edit', (req, res) => {
    babysatter.findById(req.params.id, function(err, babysatter) {
      res.render('babysatters-edit', {babysatter: babysatter});
    })
  });

// UPDATE
  app.put('/babysatters/:id', (req, res) => {
    babysatter.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/babysatters/${babysatter._id}`)
      })
      .catch(err => {
        console.log(err.message)
    });
  });

// DELETE
  app.delete('/babysatters/:id', function (req, res) {
    console.log("DELETE babysatter")
    babysatter.findByIdAndRemove(req.params.id).then((babysatter) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
      });
  });

module.exports = app