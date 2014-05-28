var buffet = require('buffet')
  , path = require('path')

module.exports = function (app) {
  app.conf.static || (app.conf.static = {});
  app.conf.static.cwd || (app.conf.static.cwd = path.join(app.dir, 'public'));
  return buffet(app.conf.public, app.conf.static);
}
module.exports.weight = -1000;
