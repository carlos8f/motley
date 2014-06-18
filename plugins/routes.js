var inherits = require('util').inherits;

module.exports = function (app) {
  app.require('controller');
  app.require('plugins');
  app.require('router');

  function Routes (specs) {
    var self = this;
    app.plugins.Plugins.call(this, specs);
    this.handler = app.controller();
    this.once('ready', function (files) {
      files.forEach(function (file) {
        if (file.plugin) {
          var plugin = file.plugin();
          var handler = plugin.handler || plugin;
          var weight = handler.weight || plugin.weight || file.plugin.weight;
          self.handler.add(weight, handler);
        }
      });
    });
  }
  inherits(Routes, app.plugins.Plugins);

  var categories = ['middleware', 'controllers', 'afterware'];
  var specs = {middleware: [], controllers: [], afterware: []};
  var latch = categories.length;
  app._conf.files().forEach(function (file) {
    categories.forEach(function (k) {
      if (file.plugin[k]) specs[k].push({globs: file.plugin[k], cwd: file.cwd});
    });
  });
  categories.forEach(function (k) {
    var routes = new Routes(specs[k]);
    routes.once('ready', function () {
      if (!--latch) app.emit('routes');
    });
    app.router.add(routes.handler);
  });
};
