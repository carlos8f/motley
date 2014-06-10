var modeler = require('modeler-leveldb');

module.exports = function (app) {
  app.require('db');
  return function (_opts) {
    _opts || (_opts = {});
    _opts.db = app.db;
    return modeler(_opts);
  };
};
