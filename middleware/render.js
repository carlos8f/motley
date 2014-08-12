module.exports = function (app) {
  if (app.views) {
    var views = app.views();
    if (views) return views.middleware(app.conf.render);
  }
  return function (req, res, next) { next() };
};
module.exports.weight = -1000;
