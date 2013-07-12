var app = require('./');

if (!app.router) {
  var middler = require('middler');

  if (app.conf.https) require('./https');
  else require('./http');

  app.router = middler(app.server);
}
