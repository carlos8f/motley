module.exports = function (app) {
  if (app.public) {
    var pub = app.public();
    return pub ? pub.middleware(app.conf.static) : function (req, res, next) { next() };
  }
  else return function (req, res, next) { next() };
};
module.exports.weight = -1000;
