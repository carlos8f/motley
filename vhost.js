var app = require('./');

if (!app.vhost) {
  require('./controller');
  require('./glob');
  app.vhost = function (hostPattern, filePattern) {
    var controller = app.controller();
    app.glob.sync(filePattern, {cwd: app.root}).forEach(function (p) {
      var handler = require(p);
      if (typeof handler === 'function') controller.add(hostPattern, handler.weight, handler);
    });
    return controller.handler;
  };
}
