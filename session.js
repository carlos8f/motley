var app = require('./')
  , sess = require('sess')

var conf = app.conf.session || {};
conf.session.cookie || (conf.session.cookie = {});
if (typeof conf.session.cookie.maxAge === 'undefined')
  conf.session.cookie.maxAge = 86400 * 365; // one year
conf.key || (conf.key = app.pkg.name);

require('./sessions');
conf.sessions = app.sessions;

module.exports = sess(conf);
module.exports.weight = -500;
