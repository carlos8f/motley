var templ = require('templ')
  , path = require('path')

module.exports = function (app) {
  if (app.conf.views && app.conf.views.length) {
    var controller = app.controller();
    app.conf.views.forEach(function (spec) {
      var options = {cwd: spec.cwd};
      if (app.conf.render) {
        Object.keys(app.conf.render).forEach(function (k) {
          options[k] = app.conf.render[k];
        });
      }
      controller.add(templ(spec.globs, options));
    });
    return controller;
  }
  else return function (req, res, next) { next(); }
}
module.exports.weight = -1000;
