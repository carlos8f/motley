var Downer = require('downer').Downer;

module.exports = function (app) {
  app.require('handlebars');
  var options = {handlebars: app.handlebars};
  var fn = function () {
    var specs = [];
    app._conf.files().forEach(function (file) {
      if (file.plugin.views) specs.push({globs: file.plugin.views, cwd: file.cwd});
    });
    if (specs.length) {
      var t = new Downer(specs, options);
      app.once('close', function () {
        t.close();
      });
      return t;
    }
  };
  return fn;
};
