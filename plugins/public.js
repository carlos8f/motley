var Buffet = require('buffet').Buffet;

module.exports = function (app) {
  var fn = function () {
    var specs = [];
    app._conf.files().forEach(function (file) {
      if (file.plugin.public) specs.push({globs: file.plugin.public, cwd: file.cwd});
    });
    if (specs.length) {
      var b = new Buffet(specs);
      app.once('close', function () {
        b.close();
      });
      return b;
    }
  };
  return fn;
};
