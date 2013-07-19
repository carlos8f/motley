var app = require('../../');

app.boot(function (err) {
  if (err) throw err;
  require('../../plugins/load');
  app.load('./plugins');
  // etc
});
