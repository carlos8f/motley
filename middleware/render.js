var app = require('../')
  , existsSync = require('fs').existsSync

var conf = app.conf.render || {root: app.root + '/views'};

if (existsSync(conf.root)) {
  require('../plugins/templ');
  module.exports = app.templ(conf.root);
  module.exports.weight = -1000;
}
