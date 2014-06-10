module.exports = function (app) {
  if (app.public) {
    return app.public().middleware(app.conf.static);
  }
  else return function (req, res, next) { next(); }
};
module.exports.weight = -1000;
