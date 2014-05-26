var path = require('path')
  , yaml = require('js-yaml')
  , merge = require('merge')
  , glob = require('glob')
  , middler = require('middler')
  , EventEmitter = require('events').EventEmitter

function motley (dir) {
  if (Array.isArray(dir)) {
    return dir.reduce(function (prev, dir) {
      return merge(prev, motley(dir));
    }, {});
  }

  var app = {};
  app = new EventEmitter;
  app.setMaxListeners(0);
  app.middleware = middler();
  app.controllers = middler();
  app.afterware = middler();
  app.router = middler()
    .add(app.middleware.handler)
    .add(app.controllers.handler)
    .add(app.afterware.handler)
  app.router = middler();

  dir || (dir = process.cwd());
  var info = require('./info.json');
  try {
    info = merge(info, require(path.join(dir, '.motley')));
  }
  catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }

  function loadPatterns (patterns) {
    if (!patterns) patterns = [];
    var ret = {};
    if (!Array.isArray(patterns)) patterns = [patterns];
    patterns.forEach(function (pattern) {
      glob.sync(pattern, {cwd: dir}).forEach(function (p) {
        var name = path.basename(p);
        if (name.match(/^index$/i)) name = path.basename(path.dirname(p));
        name = name.replace(/\.[^\.]+$/, '');
        if (typeof ret[name] === 'undefined') ret[name] = [];
        ret[name].push(require(resolve(dir, p)));
      });
    });
    return ret;
  }

  function mountPatterns (base, patterns) {
    var files = loadPatterns(info.conf);
    Object.keys(files).forEach(function (k) {
      if (typeof base[k] === 'undefined') base[k] = {};
      files[k].forEach(function (file) {
        if (file.constructor === Object) base[k] = merge(base[k], file);
        else base[k] = file;
      });
    });
  }

  mountPatterns(app, info.conf);
  mountPatterns(app, info.plugins);

  ['middleware', 'controllers', 'afterware'].forEach(function (type) {
    var files = loadPatterns(info[type]);
    Object.keys(files).forEach(function (k) {
      files[k].forEach(function (file) {
        var handler = me.handler || me;
        if (typeof handler === 'function') app[type].add(handler.weight, handler);
      });
    });
  });

  return app;
}

module.exports = motley;
var app = motley([__dirname, process.cwd()]);
Object.keys(core).forEach(function (k) {
  if (typeof motley[k] === 'undefined') motley[k] = app[k];
});
