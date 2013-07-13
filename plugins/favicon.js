var app = require('../')
  , joinPath = require('path').join

if (!app.favicon) {
  require('./dish');
  app.favicon = function (p) {
    return app.dish.file(p || joinPath(__dirname, '../assets/motley.ico'));
  };
}
