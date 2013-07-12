var app = require('./');

if (!app.collection) {
  var modeler = require('modeler-redis');
  require('./redis');
  app.collection = function (_opts) {
    _opts || (_opts = {});
    _opts.client = app.redis;
    _opts.prefix || (_opts.prefix = app.pkg.name + ':');
    return modeler(_opts);
  };
}
