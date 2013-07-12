var app = require('./')
  , pause = require('pause')

module.exports = function (req, res, next) {
  // buffer incoming data until resume() is called
  req.pause = function () {
    if (req.paused) return;
    req.paused = true;
    var paused = pause(req);
    req.resume = function () {
      if (!req.paused) return;
      req.paused = false;
      paused.resume();
    };
  };
  req.pause();
  next();
};

module.exports.weight = -5000;
