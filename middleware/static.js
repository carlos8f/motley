module.exports = function container (get, set) {
  var buffet = new get('vendor.buffet').Buffet(get('conf.middleware.static.paths'));
  set('@middleware.static.buffet', buffet);
  return buffet.middleware(get('conf.middleware.static'));
};
