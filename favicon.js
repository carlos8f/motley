var app = require('./');

if (!app.favicon) {
  require('./dish');
  app.favicon = app.dish.file(__dirname + '/motley.ico');
}
