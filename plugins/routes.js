var inherits = require('util').inherits;

module.exports = function (app) {
  app.require('controller');
  app.require('plugins');
  app.require('router');

  function Routes (specs) {
    app.plugins.Plugins.call(this, specs);
    this.levels = [];
    var self = this;
    this.on('ready', function (files) {
      files.forEach(function (file) {
        if (file.plugin) {
          var plugin = file.plugin();
          if (typeof self.levels[file.weight] === 'undefined') {
            self.levels[file.weight] = app.controller();
            app.router.add(file.weight, self.levels[file.weight]);
          }
          var handler = plugin.handler || plugin;
          var weight = handler.weight || plugin.weight;
          self.levels[file.weight].add(weight, handler);
        }
      });
      app.emit('routes');
    });
  }
  inherits(Routes, app.plugins.Plugins);

  var middleware = [], controllers = [], afterware = [];
  app._conf.files().forEach(function (file) {
    if (file.plugin.middleware) middleware.push({globs: file.plugin.middleware, cwd: file.cwd});
    if (file.plugin.controllers) controllers.push({globs: file.plugin.controllers, cwd: file.cwd});
    if (file.plugin.afterware) afterware.push({globs: file.plugin.afterware, cwd: file.cwd});
  });
  var specs = [].concat(middleware, controllers, afterware);
  return specs.length ? new Routes(specs) : null;
};
