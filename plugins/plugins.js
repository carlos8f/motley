var Mayonnaise = require('mayonnaise').Mayonnaise
  , inherits = require('util').inherits
  , merge = require('merge')

module.exports = function (app) {
  function Plugins (specs) {
    Mayonnaise.call(this, specs);
    var self = this;
    this.once('ready', function (files) {
      files.forEach(function (file) {
        self.require(file.pluginPath);
      });
    });
    this.on('all', function (op, file) {
      if (op === 'add' || op === 'update' || op === 'remove') {
        app.reboot();
      }
    });
    app.once('close', function () {
      self.close();
    });
  }
  inherits(Plugins, Mayonnaise);

  Plugins.prototype.close = function () {
    this.files().forEach(function (file) {
      delete require.cache[file.fullPath];
    });
    Mayonnaise.prototype.close.call(this);
    this.removeAllListeners();
  };

  Plugins.prototype.makePluginPath = function (file) {
    return file.key
      .replace(/\.[^\.]+$/, '')
      .replace(/_(afterware|middleware|controller|collection|plugin)$/, '')
      .replace(/^\//, '');
  };

  Plugins.prototype.compile = function (file) {
    if (file.name.match(/\.js$/)) return require(file.fullPath).bind(null, app);
  };
  Plugins.prototype.require = function (p) {
    var file = this.getPlugin(p);
    if (typeof file === 'undefined') throw new Error('plugin `' + p + '` not found');
    var key = file.pluginPath.replace(/^\//, '');
    if (typeof app[key] === 'undefined') {
      app[key] = file.plugin();
      app.names.push(key);
    }
    return app[key];
  };

  var fn = function () {
    var specs = [];
    app._conf.files().forEach(function (file) {
      if (file.weight === 0 && app.conf.minimal) return;
      if (file.plugin.plugins) specs.push({globs: file.plugin.plugins, cwd: file.cwd});
      if (file.plugin.collections) specs.push({globs: file.plugin.collections, cwd: file.cwd});
    });
    return new Plugins(specs);
  };
  fn.Plugins = Plugins;
  return fn;
};
