var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  app.motley();
  app.router.on('error', function (err, req, res) {
    res.render('error', {title: 'WTF', message: err.message});
  });
  app.router.last(function (req, res, next) {
    res.renderStatus(404);
  });
  app.server.listen(app.conf.port, function () {
    console.log('server running at http://localhost:' + app.conf.port + '/');
  });
});
