var Templ = require('templ').Templ;

module.exports = function (app) {
  var fn = function () {
    var specs = [];
    app._conf.files().forEach(function (file) {
      if (file.plugin.views) specs.push({globs: file.plugin.views, cwd: file.cwd});
    });
    if (specs.length) {
      var t = new Templ(specs);
      app.once('close', function () {
        t.close();
      });
      return t;
    }
  };
  return fn;
};
