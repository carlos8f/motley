var dirname = require('path').dirname;

var app = module.exports = new (require('events').EventEmitter);
app.setMaxListeners(0);

app.boot = function (cb) {
  require('./pkg')(function (err, p, pkg) {
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
