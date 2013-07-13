var app = require('../');

if (!app.users) {
  require('../plugins/collection');

  app.users = app.collection({
    name: 'users'
  });
}
