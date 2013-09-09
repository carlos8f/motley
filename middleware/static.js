var app = require('../')
  , existsSync = require('fs').existsSync

var conf = app.conf.static || {root: app.root + '/public'};
require('../plugins/buffet');

if (!existsSync(conf.root)) conf.root = '.';
module.exports = app.buffet(conf);
module.exports.weight = -1000;
