module.exports = function (app) {
  if (app.views) {
    var views = app.views();
    return views ? views.middleware(app.conf.render) : function (req, res, next) { next() };
  }
  else return function (req, res, next) { next() };
};
module.exports.weight = -1000;
