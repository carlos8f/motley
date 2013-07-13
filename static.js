var app = require('./')
  , existsSync = require('fs').existsSync

var conf = app.conf.static || {root: app.root + '/public'};

if (existsSync(conf.root)) {
  require('./buffet');
  module.exports = app.buffet(conf);
  module.exports.weight = -1000;
}
