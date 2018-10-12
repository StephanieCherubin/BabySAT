const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/babySAT');

const Review = require('./models/review')
const Babysatter = require("./models/babysatter")
const bodyParser = require('body-parser');

app.use(express.static('./public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');