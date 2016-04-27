var addr = require('addr');

module.exports = function container (get) {
  return function (req, res, next) {
    req.addr = addr(req, get('conf.proxies'));
    next();
  };
};
