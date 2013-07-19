var basename = require('path').basename;

var app = module.exports = new (require('events').EventEmitter);
app.setMaxListeners(0);

// boot the pkginfo and conf
app.boot = function (cb) {
  app.root = process.cwd();
  app.core = __dirname;
  try {
    app.pkg = require(app.root + '/package.json');
  }
  catch (e) {
    app.pkg = {
      name: 'untitled',
      version: '0.0.0',
      description: 'a motley app',
      main: process.argv.length > 1 ? basename(process.argv[1]) : undefined,
      dependencies: {}
    };
  }
  require('./plugins/conf');
  app.loadConf(function (err, conf) {
    if (err) return cb(err);
    app.conf = conf;
    cb();
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
