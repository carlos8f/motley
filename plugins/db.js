var level = require('level')
  , path = require('path')
  , mkdirp = require('mkdirp')
  , tmpDir = require('os').tmpDir()

module.exports = function (app) {
  var dir = app.conf.db;
  if (!dir && process.env.HOME && app.conf.id) {
    dir = path.join(process.env.HOME, '.motley', app.conf.id);
  }
  if (!dir && tmpDir && app.conf.id) {
    dir = path.join(tmpDir, '.motley', app.conf.id);
  }
  if (!dir) dir = path.join(app.dir, 'db');
  mkdirp.sync(dir);

  var db = level(dir);
  app.once('close', function () {
    db.close();
  });
  return db;
};
