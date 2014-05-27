var buffet = require('buffet');

module.exports = function (app) {
  return buffet(app.conf.public, app.conf.static);
}
module.exports.weight = -1000;
