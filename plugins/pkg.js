var path = require('path');

module.exports = function (app) {
  try {
    return require(path.join(app.dir, 'package.json'));
  }
  catch (e) {
    return {};
  }
};
