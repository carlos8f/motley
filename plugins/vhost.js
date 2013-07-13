var app = require('../');

if (!app.vhost) {
  require('./controller');
  require('./load');
  require('./router');
  app.vhost = function (hostPattern, dir) {
    var vhost = app.controller();
    app.load(dir).forEach(function (moduleExports) {
      var handler = moduleExports.handler || moduleExports;
      if (typeof handler === 'function') vhost.add(hostPattern, handler.weight, handler);
    });
    vhost.add(10000, function (req, res, next) {
      next();
    });
    app.router.add(hostPattern, vhost.handler);
  };
}
