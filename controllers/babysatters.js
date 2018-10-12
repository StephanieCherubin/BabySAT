module.exports = function (app, Babysatter) {

  app.get('/', (req, res) => {
    Babysatter.find()
      .then(babysatters => {
        res.render('babysatters-index', {babysatters: babysatters});
      })
      .catch(err => {
        console.log(err);
      });
  });

}