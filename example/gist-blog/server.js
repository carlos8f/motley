var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  app.collection = require('modeler'); // for demonstration purposes, use memory store
  app.motley();
  app.router.on('error', function (err, req, res) {
    res.render('error', {title: 'WTF', message: err.message});
  });
  app.server.listen(app.conf.port, function () {
    console.log('server running at http://localhost:' + app.conf.port + '/');
  });
});
