var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  app.motley();
  app.router.on('error', function (err, req, res) {
    res.render('error', {title: 'WTF', message: err.message});
  });
  app.server.listen(3000, function () {
    console.log('server running at http://localhost:3000/');
  });
});
