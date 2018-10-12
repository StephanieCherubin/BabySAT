const express = require('express')
const methodOverride = require('method-override')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/babySAT');

const reviews = require('./controllers/reviews')(app);
const bodyParser = require('body-parser');
const Review = require('./models/review')

app.use(express.static('./public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');