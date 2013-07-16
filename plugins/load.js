var app = require('../')
  , resolve = require('path').resolve

if (!app.load) {
  require('./glob');
  app.load = function (dir) {
    return app.glob.sync(dir + '/**.js', {cwd: app.root}).map(function (p) {
      return require(resolve(app.root, p));
    });
  };
}
