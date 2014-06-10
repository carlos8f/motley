var Mayonnaise = require('mayonnaise').Mayonnaise
  , inherits = require('util').inherits
  , yaml = require('js-yaml')
  , path = require('path')
  , merge = require('merge')

module.exports = function (app) {
  function Conf (specs) {
    Mayonnaise.call(this, specs);
    this.on('all', function (op, file) {
      if (op.match(/^add|update|cleanup$/)) {
        app.conf = this.getMerged();
      }
    });
    this.on('ready', function () {
      specs.forEach(function (spec) {
        
      });
    });
  }
  inherits(Conf, Mayonnaise);

  Conf.prototype.compile = function (file) {
    if (file.name.match(/\.ya?ml$/)) return yaml.safeLoad(file.data({encoding: 'utf8'}));
    if (file.name.match(/\.js$/)) {
      var exp = require(file.fullPath);
      if (typeof exp === 'function') return exp.call(app, app);
      else return exp;
    }
    else if (file.name.match(/\.json$/)) return require(file.fullPath);
  };
  Conf.prototype.getMerged = function () {
    return this.getPlugin('motley', {merge: merge});
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
