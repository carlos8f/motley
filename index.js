var dirname = require('path').dirname
  , witwip = require('witwip')

var app = module.exports = new (require('events').EventEmitter);
app.setMaxListeners(0);

// boot the pkginfo and conf
app.boot = function (cb) {
  witwip(module.parent, function (err, p, pkg) {
    if (err) return cb(err);
    app.root = dirname(p);
    app.core = __dirname;
    app.pkg = pkg;
    require('./plugins/conf');
    app.loadConf(function (err, conf) {
      if (err) return cb(err);
      app.conf = conf;
      cb();
    });
  });
};

// the band of merry middleware
app.motley = function () {
  // load plugins
  require('./plugins/load');
  app.load(app.core + '/plugins');
  app.load(app.root + '/plugins');

  // mount middleware and controllers
  app.vhost('*', app.core + '/middleware');
  app.vhost('*', app.root + '/middleware');
  app.vhost('*', app.root + '/controllers');

  // generic favicon
  app.router.get(500, '/favicon.ico', app.favicon());

  // generic 404 handler
  app.router.add(10000, app.handle404);
};
