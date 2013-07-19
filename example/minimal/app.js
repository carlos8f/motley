var app = require('motley');

app.boot(function (err) {
  if (err) throw err;
  require('motley/plugins/load');
  app.load('./plugins');
  app.hello();
});
