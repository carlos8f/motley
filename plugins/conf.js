var Mayonnaise = require('mayonnaise').Mayonnaise
  , inherits = require('util').inherits
  , yaml = require('js-yaml')
  , path = require('path')
  , merge = require('merge')

module.exports = function (app) {
  function Conf (specs) {
    Mayonnaise.call(this, specs);
    var self = this;
    this.once('update', function (file) {
      app.reboot();
    });
    this.once('ready', function (files) {
      app.conf = this.get();
      var plugins = require('./plugins')(app)();
      app.require = plugins.require.bind(plugins);
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
    return this.getPlugin('/motley', {merge: merge});
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
    return new Conf(specs);
  };
  fn.Conf = Conf;
  return fn;
};
