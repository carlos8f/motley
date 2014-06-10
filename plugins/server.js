var http = require('http');

module.exports = function (app) {
  var server = http.createServer();
  if (app.conf.port !== false && typeof app.conf.port !== 'undefined') {
    app.once('routes', function () {
      server.listen(app.conf.port, function () {
        console.log('server running at http://localhost:' + server.address().port + '/');
      });
    });
    app.once('close', function () {
      server.close();
    });
  }
  return server;
};
