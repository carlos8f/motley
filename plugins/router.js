var middler = require('middler');

module.exports = function (app) {
  var router = middler(app.server);
  setImmediate(function () {
    router
      .add(app.middleware.handler)
      .add(app.controllers.handler)
      .add(app.afterware.handler);
  });
  return router;
};
