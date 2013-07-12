var app = require('./');

if (!app.sessions) {
  require('./collection');
  app.sessions = app.collection({name: 'sessions'});
}
