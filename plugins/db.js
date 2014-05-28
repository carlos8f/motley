var level = require('level')
  , path = require('path')

module.exports = function (app) {
  return level(app.conf.db || path.join(app.dir, 'db'));
};
