var middler = require('middler');

module.exports = function (app) {
  app.require('server');
  return middler(app.server);
};
