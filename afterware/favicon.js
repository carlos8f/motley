var path = require('path')
  , dish = require('dish')

module.exports = function (app) {
  return app.controller()
    .get('/favicon.ico', dish.file(path.join(__dirname, '../assets/motley.ico')))
    .handler;
};
