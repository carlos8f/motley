var path = require('path')
  , glob = require('glob')
  , fs = require('fs')
  , yaml = require('js-yaml')
  , middler = require('middler')
  , EventEmitter = require('events').EventEmitter

function motley (cwd, app) {
  if (!app) {
    if (cwd === __dirname) {
      app = new EventEmitter;
      app.setMaxListeners(0);
    }
    else app = motley(__dirname);
  }
  cwd || (cwd = process.cwd());

  app.boot = function () {
    var roots = app.roots;
    var last = roots[roots.length - 1];
    if (last.conf.minimal) roots = [last];
    var plugins = roots.reduce(function (prev, root) {
      Object.keys(root).forEach(function (k) {
        if (last.conf.disable && ~last.conf.disable.indexOf(k)) return;
        if (!~prev.indexOf(k)) prev.push(k);
      });
      return prev;
    }, []);
    plugins.forEach(function (plugin) {
      app.require(plugin);
    });
    if (app.router) {
      ['middleware', 'controllers', 'afterware'].forEach(function (type) {
        if (app[type]) {
          var chain = middler();
          chain.first(function (req, res, next) {
            next();
          });
          Object.keys(app[type]).forEach(function (name) {
            var fn = app[type][name].call(null, app);
            try {
              chain.add(fn.weight || app[type][name].weight, fn.handler || fn);
            }
            catch (e) {
              throw new Error('error loading middleware `' + name + '`: ' + e.message);
            }
          });
          app.router.add(chain.handler);
          app[type].router = chain;
        }
      });
    }
    if (app.server && (app.conf.port || app.conf.port === 0)) {
      app.server.listen(app.conf.port, function () {
        console.log('server running at http://localhost:' + app.server.address().port + '/');
      });
    }
  };

  app.require = function (name) {
    if (typeof app[name] !== 'undefined') return;
    var roots = app.roots.slice();
    if (name === 'conf') {
      app.conf = {};
      roots.reverse();
    }
    for (var idx = roots.length - 1; idx >= 0; idx--) {
      var root = roots[idx];
      if (typeof root[name] !== 'undefined') {
        var pluginExports = root[name];
        if (name === 'conf') {
          // merge certain arrays in the conf
          Object.keys(pluginExports).forEach(function (k) {
            if (k.match(/^plugins|collections|afterware|middleware|controllers|views|public$/)) {
              if (!app.conf[k]) app.conf[k] = [];
              var spec = {
                cwd: root.dir,
                globs: Array.isArray(pluginExports[k]) ? pluginExports[k] : [pluginExports[k]]
              };
              app.conf[k].push(spec);
            }
            else app.conf[k] = pluginExports[k];
          });
          continue;
        }
        else if (typeof pluginExports === 'function') {
          var bound = pluginExports.call(null, app);
          bound.weight = bound.weight || pluginExports.weight;
          app[name] = bound;
        }
        else {
          app[name] = pluginExports;
        }
        return app[name];
      }
    }
    if (name !== 'conf') throw new Error('plugin `' + name + '` not found');
    return app.conf;
  };

  function loadRoot (motleyFile) {
    var stat = fs.statSync(motleyFile);
    if (stat.isDirectory()) motleyFile = path.join(motleyFile, 'motley.yml');
    var root = {
      dir: path.dirname(path.resolve(motleyFile)),
      conf: (function () {
        if (motleyFile.match(/\.js(on)?$/)) return require(motleyFile);
        else if (motleyFile.match(/\.ya?ml/)) {
          var str = fs.readFileSync(motleyFile, {encoding: 'utf8'});
          return yaml.safeLoad(str);
        }
        else throw new Error('motleyFile must have extension .js, .json, .yml, or .yaml');
      })()
    };
    ['plugins', 'collections', 'afterware', 'middleware', 'controllers'].forEach(function (type) {
      var patterns = root.conf[type];
      if (!patterns) return;
      if (!Array.isArray(patterns)) patterns = [patterns];
      patterns.forEach(function (pattern) {
        glob.sync(pattern, {cwd: root.dir}).forEach(function (p) {
          // detect plugin name from file path
          var name = path.basename(p);
          if (name.match(/^index$/i)) name = path.basename(path.dirname(p));
          // strip type or extension from plugin name
          name = name.replace(/(_[^_\.]+)?\.[^\.]+$/, '');
          var file = require(path.resolve(root.dir, p));
          var base = root;
          if (type.match(/^afterware|middleware|controllers$/)) {
            if (typeof root[type] === 'undefined') root[type] = {};
            base = root[type];
          }
          if (typeof base[name] === 'undefined') base[name] = {};
          base[name] = file;
        });
      });
    });
    return root;
  };

  app.roots || (app.roots = []);
  app.roots.push(loadRoot(cwd));

  return app;
}

module.exports = motley;
