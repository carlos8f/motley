var addr = require('addr');

module.exports = function (app) {
  return function (req, res, next) {
    req.addr = addr(req, app.conf.proxies || ['127.0.0.1']);
    next();
  };
};
module.exports.weight = -2000;
