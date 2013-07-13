var dirname = require('path').dirname
  , witwip = require('witwip')

var app = module.exports = new (require('events').EventEmitter);
app.setMaxListeners(0);

// boot the pkginfo and conf
app.boot = function (cb) {
  witwip(module.parent, function (err, p, pkg) {
    if (err) return cb(err);
    app.root = dirname(p);
    app.pkg = pkg;
    require('./conf');
    app.loadConf(function (err, conf) {
      if (err) return cb(err);
      app.conf = conf;
      cb();
    });
  });
};

// the band of merry middleware, plus app controllers
app.motley = function () {
  // generic vhosts
  require('./vhost');
  app.vhost('*', __dirname + '/*.js');
  app.vhost('*', app.root + '/controllers/*.js');

  require('./router');

  // generic favicon
  require('./favicon');
  app.router.get(9000, '/favicon.ico', app.favicon);

  // generic 404 handler
  require('./404');
  app.router.add(10000, app.notFound);
};
