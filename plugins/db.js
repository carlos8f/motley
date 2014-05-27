var level = require('level');

module.exports = function (app) {
  return level(app.conf.db || 'db');
};
