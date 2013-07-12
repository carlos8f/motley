var app = require('./');

if (!app.server) {
  app.server = require('https').createServer(app.conf.https);
}
