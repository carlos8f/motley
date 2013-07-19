var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  app.motley();
  app.server.listen(app.conf.port, function () {
    console.log('server running at http://localhost:' + app.conf.port + '/');
  });
});
