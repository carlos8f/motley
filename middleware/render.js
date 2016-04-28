module.exports = function container (get, set) {
  var handlebars = get('vendor.handlebars').create();
  set('@middleware.render.handlebars', handlebars);
  var options = get('conf.middleware.render');
  options.handlebars = handlebars;
  var downer = new get('vendor.downer').Downer(get('conf.middleware.render.paths'), options);
  set('@middleware.render.downer', downer);
  return downer.middleware(options);
};
