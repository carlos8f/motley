var app = require('../');

if (!app.router) {
  require('./server');
  require('./controller');

  app.router = app.controller().attach(app.server);
}
