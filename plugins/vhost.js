var app = require('../');

if (!app.vhost) {
  require('./controller');
  require('./glob');
  require('./router');
  app.vhost = function (hostPattern, filePattern) {
    var vhost = app.controller();
    if (!~filePattern.match(/\*\.js$/)) filePattern += '*.js';
    app.glob.sync(filePattern, {cwd: app.root}).forEach(function (p) {
      var handler = require(p);
      if (typeof handler === 'function') vhost.add(hostPattern, handler.weight, handler.handler || handler);
    });
    vhost.add(10000, function (req, res, next) {
      next();
    });
    app.router.add(vhost.handler);
  };
}
