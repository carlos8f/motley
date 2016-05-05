module.exports = function container (get) {
  return function addr (req, res, next) {
    req.addr = get('vendor.addr')(req, get('conf.middleware.addr.proxies'));
    next();
  };
};
