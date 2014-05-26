var app = require('../')
  , existsSync = require('fs').existsSync
  , templ = require('templ')

var conf = app.conf.render || {root: app.root + '/views'};

if (existsSync(conf.root)) {
  module.exports = templ(conf.root);
  module.exports.weight = -1000;
}
