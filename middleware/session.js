var sess = require('sess');

module.exports = function (app) {
  var conf = app.conf.session || {};
  conf.cookie || (conf.cookie = {});
  if (typeof conf.cookie.maxAge === 'undefined') conf.cookie.maxAge = 86400 * 365;
  conf.key || (conf.key = app.pkg.name);
  conf.sessions = app.sessions;
  return sess(conf);
};
module.exports.weight = -500;
