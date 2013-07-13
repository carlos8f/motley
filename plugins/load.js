var app = require('../');

if (!app.load) {
  require('./glob');
  app.load = function (dir) {
    return app.glob.sync(dir + '/**.js', {cwd: app.root}).map(require);
  };
}
