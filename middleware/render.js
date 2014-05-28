var templ = require('templ');

module.exports = function (app) {
  app.conf.render || (app.conf.render = {});
  app.conf.render.cwd || (app.conf.render.cwd = app.dir);
  return templ(app.conf.views, app.conf.render);
};
module.exports.weight = -1000;
