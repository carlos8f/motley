var app = require('../')
  , existsSync = require('fs').existsSync

require('../plugins/templ');
module.exports = app.templ(app.conf.render);
module.exports.weight = -1000;
