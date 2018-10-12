const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');

const Review = require('./models/review')
const Babysatter = require("./models/babysatter")
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(express.static('./public'))
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
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/BabySAT";

mongoose.connect( mongoUri, { useNewUrlParser: true });

app.listen(port, () => {
  console.log(`App listening on ${port}`)
});

module.exports = app