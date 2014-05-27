var path = require('path')
  , merge = require('merge')
  , fs = require('fs')
  , glob = require('glob')
  , yaml = require('js-yaml')
  , middler = require('middler')
  , EventEmitter = require('events').EventEmitter

function motley (dir) {
  if (Array.isArray(dir)) {
    return dir.reduce(function (prev, dir) {
      var m = motley(dir);
      if (prev.middleware) m.middleware = prev.middleware.add(m.afterware.handler);
      if (prev.controllers) m.controllers = prev.controllers.add(m.controllers.handler);
      if (prev.afterware) m.afterware = prev.afterware.add(m.afterware.handler);
      return merge(prev, m);
    }, {});
  }

  var app = new EventEmitter;
  app.setMaxListeners(0);
  app.middleware = middler();
  app.controllers = middler();
  app.afterware = middler();
  app.router = middler()
    .add(app.middleware.handler)
    .add(app.controllers.handler)
    .add(app.afterware.handler);

  app.dir = dir;
  app.dir || (app.dir = process.cwd());

  function loadPatterns (patterns) {
    if (!patterns) patterns = [];
    var ret = {};
    if (!Array.isArray(patterns)) patterns = [patterns];
    patterns.forEach(function (pattern) {
      glob.sync(pattern, {cwd: app.dir}).forEach(function (p) {
        var name = path.basename(p);
        if (name.match(/^index$/i)) name = path.basename(path.dirname(p));
        name = name === '.motley' ? 'conf' : name.replace(/\.[^\.]+$/, '');
        if (typeof ret[name] === 'undefined') ret[name] = [];
        if (path.basename(p) === '.motley') {
          // these are interpreted in YAML
          try {
            var str = fs.readFileSync(p, {encoding: 'utf8'});
            ret[name].push(yaml.safeLoad(str));
          }
          catch (e) {
            throw e;
          }
          return;
        }

        var fn = require(path.resolve(app.dir, p));
        var bound = fn.call(app, app);
        bound.weight = fn.weight;
        ret[name].push(bound);
      });
    });
    return ret;
  }

  function mountPatterns (base, patterns) {
    var files = loadPatterns(patterns);
    Object.keys(files).forEach(function (k) {
      if (typeof base[k] === 'undefined') base[k] = {};
      files[k].forEach(function (file) {
        if (file.constructor === Object) base[k] = merge(base[k], file);
        else base[k] = file;
      });
    });
  }

  mountPatterns(app, path.join(dir, '.motley'));
  if (app.conf) {
    if (app.conf.plugins) mountPatterns(app, app.conf.plugins);
    if (app.conf.collections) mountPatterns(app, app.conf.collections);

    ['middleware', 'controllers', 'afterware'].forEach(function (type) {
      var files = loadPatterns(app.conf[type]);
      Object.keys(files).forEach(function (k) {
        files[k].forEach(function (file) {
          if (typeof file === 'function') app[type].add(file.weight, file);
        });
      });
    });
  }

  return app;
}

module.exports = motley;
