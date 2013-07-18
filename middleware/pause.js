var pause = require('pause');

module.exports = function (req, res, next) {
  // buffer incoming data until unpause() is called
  req.pause = function () {
    if (req.paused) return;
    req.paused = true;
    var paused = pause(req);
    req.unpause = function () {
      if (!req.paused) return;
      req.paused = false;
      paused.resume();
    };
  };
  req.pause();
  next();
};

module.exports.weight = -5000;
