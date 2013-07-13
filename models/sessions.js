var app = require('../');

if (!app.sessions) {
  require('../plugins/collection');
  app.sessions = app.collection({name: 'sessions'});
}
