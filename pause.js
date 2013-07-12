var app = require('./');

if (!app.pause) {
  var pause = require('pause');
  require('./router');
  app.pause = function pause (req, res, next) {
    // buffer incoming data until resume() is called
    var paused = pause(req);
    req.resume = function () {
      paused.resume();
    };
    next();
  };
  app.router.first(app.pause);
}
