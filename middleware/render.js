module.exports = function (app) {
  if (app.views) {
    return app.views().middleware(app.conf.render);
  }
  else return function (req, res, next) { next(); }
};
module.exports.weight = -1000;
