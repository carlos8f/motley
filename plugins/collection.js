var modeler = require('modeler-leveldb');

module.exports = function (app) {
  return function (_opts) {
    _opts || (_opts = {});
    _opts.db = app.db;
    return modeler(_opts);
  };
};
