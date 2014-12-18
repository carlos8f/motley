var Mayonnaise = require('mayonnaise').Mayonnaise
  , inherits = require('util').inherits
  , yaml = require('js-yaml')
  , path = require('path')
  , merge = require('merge')
  , prompt = require('cli-prompt')
  , idgen = require('idgen')

module.exports = function (app) {
  function Conf (specs, pluginName) {
    this.specs = specs;
    this.pluginName = pluginName;
    Mayonnaise.call(this, specs);
    var self = this;
    this.once('update', function (file) {
      app.reboot();
    });
    this.once('ready', function (files) {
      app.conf = this.get();
      // special port override
      if (typeof process.env.MOTLEY_PORT !== 'undefined') {
        app.conf.port = process.env.MOTLEY_PORT;
      }
      if (typeof process.env.MOTLEY_TEST !== 'undefined') {
        app.conf.id = idgen();
      }
      function initPlugins () {
        var plugins = require('./plugins')(app)();
        app.require = plugins.require.bind(plugins);
      }
      if (app.conf.password === true) {
        prompt.password('Enter password: ', function (password) {
          app.conf.password = password;
          initPlugins();
        });
      }
      else initPlugins();
    });
    app.once('close', function () {
      self.close();
    });
  }
  inherits(Conf, Mayonnaise);

  Conf.prototype.close = function () {
    Mayonnaise.prototype.close.call(this);
    this.removeAllListeners();
  };

  Conf.prototype.compile = function (file) {
    if (file.name.match(/\.ya?ml$/)) return yaml.safeLoad(file.data({encoding: 'utf8'}));
  };
  Conf.prototype.get = function () {
    var merged = this.getPlugin('/motley', {merge: merge});
    if (this.pluginName != 'motley') {
      var customConf = this.getPlugin('/' + this.pluginName).plugin;
      merged = merge(merged, customConf);
    }
    return merged;
  };

  var fn = function (motleyFile, cwd) {
    var specs = [
      {
        cwd: path.resolve(__dirname, '../'),
        globs: ['motley.yml']
      },
      {
        cwd: cwd,
        globs: [motleyFile]
      }
    ];
    var pluginName = path.basename(motleyFile, path.extname(motleyFile));
    return new Conf(specs, pluginName);
  };
  fn.Conf = Conf;
  return fn;
};
