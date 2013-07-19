var app = require('motley');

module.exports = app.controller()
  .get('/', function (req, res, next) {
    res.render('home');
  })
