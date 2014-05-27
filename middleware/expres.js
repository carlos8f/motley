var expres = require('expres');

module.exports = function (app) {
  return expres.middleware;
};
module.exports.weight = -1000;
