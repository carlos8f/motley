var app = require('./');

if (!app.loadConf) {
  var safer = require('safer')
    , yaml = require('js-yaml')

  app.loadConf = function (cb) {
    try {
      var conf = require(app.root + '/conf.yml');
    }
    catch (e) {
      try {
        var conf = require(app.root + '/conf.json');
      }
      catch (e) {
        var conf = {};
      }
    }

    // prompt for a passphrase
    if (conf.prompt || ~process.argv.indexOf('-p')) {
      safer.prompt(app.root + '/conf.safe', function (err, safe) {
        if (err) return cb(err);

        Object.keys(safe).forEach(function (k) {
          conf[k] = safe[k];
        });

        cb(null, conf);
      });
    }
    else cb(null, conf);
  };
}
