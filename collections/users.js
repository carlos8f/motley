module.exports = function (app) {
  app.require('collection');
  return app.collection({name: 'users'});
};
