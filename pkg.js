var findPkg = require('witwip');

module.exports = function (cb) {
  findPkg(module.parent, cb);
};
