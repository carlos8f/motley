module.exports = function container (get) {
  var options = get('conf.middleware.session');
  options.sessions = get('collections.sessions');
  return get('vendor.sess')(options);
};