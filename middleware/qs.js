var qs = require('querystring');

module.exports = function (req, res, next) {
  if (!req.query) {
    try {
      var split = req.url.split('?');
      if (split.length < 2) return next();
      req.query = qs.parse(split[1]);
    }
    catch (e) {
      return next(e);
    }
  }
  next();
};
module.exports.weight = -1000;
