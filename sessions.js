var app = require('./');

if (!app.sessions) {
  var sess = require('sess');

  require('./router');
  require('./collection');

  app.sessions = app.collection({
    name: 'sessions'
  });

  var conf = app.conf.session || {};
  conf.session.cookie || (conf.session.cookie = {});
  if (typeof conf.session.cookie.maxAge === 'undefined')
    conf.session.cookie.maxAge = 86400 * 365; // one year
  conf.key || (conf.key = app.pkg.name);
  conf.sessions = app.sessions;

  // @todo: make this stuff configurable?
  app.router.first(sess(conf));
}
