module.exports = function container (get) {
  return function (req, res, next) {
    req.addr = get('vendor.addr')(req, get('conf.middleware.addr.proxies'));
    next();
  };
};
