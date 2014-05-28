var templ = require('templ')
  , path = require('path')

module.exports = function (app) {
  app.conf.render || (app.conf.render = {});
  app.conf.render.cwd || (app.conf.render.cwd = path.join(app.dir, 'views'));
  return templ(app.conf.views, app.conf.render);
};
module.exports.weight = -1000;
