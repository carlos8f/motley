var app = require('./');

if (!app.router) {
  if (app.conf.https) require('./https');
  else require('./http');

  require('./controller');

  app.router = app.controller().attach(app.server);
}
