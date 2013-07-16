var app = require('../');

if (!app.vhost) {
  require('./load');
  require('./router');
  app.vhost = function (hostPattern, dir) {
    app.load(dir).forEach(function (me) {
      var handler = me.handler || me;
      if (typeof handler === 'function') app.router.add(hostPattern, handler.weight, handler);
    });
  };
}
