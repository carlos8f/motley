var app = require('./')
  , sess = require('sess')

var conf = app.conf.session || {};
conf.cookie || (conf.cookie = {});
if (typeof conf.cookie.maxAge === 'undefined') conf.cookie.maxAge = 86400 * 365;
conf.key || (conf.key = app.pkg.name);

require('./sessions');
conf.sessions = app.sessions;

module.exports = sess(conf);
module.exports.weight = -500;
