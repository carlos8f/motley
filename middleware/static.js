var buffet = require('buffet')
  , path = require('path')

module.exports = function (app) {
  if (app.conf.public && app.conf.public.length) {
    var controller = app.controller();
    app.conf.public.forEach(function (spec) {
      console.log(spec);
      var options = {cwd: spec.cwd};
      if (app.conf.static) {
        Object.keys(app.conf.static).forEach(function (k) {
          options[k] = app.conf.static[k];
        });
      }
      controller.add(buffet(spec.globs, options));
    });
    return controller;
  }
  else return function (req, res, next) { next(); }
}
module.exports.weight = -1000;
