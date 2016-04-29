module.exports = function container (get) {
  var options = get('conf.middleware.session');
  options.sessions = get('db.motley_sessions');
  return get('vendor.sosa_session')(options);
};