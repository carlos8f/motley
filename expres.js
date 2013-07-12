var app = require('./');

if (!app.expres) {
  app.expres = require('expres').middleware;
  require('./router');
  app.router.first(app.expres);
}
