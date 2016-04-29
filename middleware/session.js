module.exports = function container (get) {
  var options = get('conf.middleware.session');
  options.sessions = get('db.sessions');
  return get('vendor.sess')(options);
};