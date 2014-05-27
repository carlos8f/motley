var templ = require('templ');

module.exports = function (app) {
  return templ(app.conf.views);
};
module.exports.weight = -1000;
