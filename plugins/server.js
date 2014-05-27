var http = require('http');

module.exports = function (app) {
  var server = http.createServer();
  app.router.attach(server);
  return server;
};
