var app = require('./');

if (!app.render) {
  app.render = require('templ')(app.conf.render);
  require('./router');
  app.router.first(app.render);
}
