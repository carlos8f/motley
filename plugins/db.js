var level = require('level')
  , path = require('path')

module.exports = function (app) {
  var db = level(app.conf.db || path.join(app.dir, 'db'));
  app.once('close', function () {
    db.close();
  });
  return db;
};
