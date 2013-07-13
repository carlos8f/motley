var app = require('./');

if (!app.users) {
  require('./collection');

  app.users = app.collection({
    name: 'users'
  });
}
