const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.render('home', { msg: 'Handlebars are Cool!' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Person", babySATterName: "Belinda" },
  { title: "Awesome Personality", babySATterName: "Tatiana" }
]

// INDEX
app.get('/reviews', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})