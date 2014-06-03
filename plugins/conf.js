var Mayonnaise = require('mayonnaise').Mayonnaise
  , inherits = require('util').inherits
  , yaml = require('js-yaml')
  , path = require('path')
  , _ = require('underscore')

module.exports = function (app) {
  function Conf (specs) {
    Mayonnaise.call(this, specs);
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
    function merge (a, b) {
      console.error(a.fullPath, b.fullPath);
      var ret = _.extend(a, b);
      function ensureArray (o) {
        if (!o) return [];
        if (Array.isArray(o)) return o;
        return [o];
      }
      app.components.forEach(function (k) {
        ret[k] = _.union(ensureArray(a[k]), ensureArray(b[k]));
      });
      return ret;
    }
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
