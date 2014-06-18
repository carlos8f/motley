module.exports = function (app) {
  return function (req, res, next) {
    res.vars || (res.vars = {});
    res.vars.title = app.conf.title;
    res.vars.dir = app.dir;
    next();
  };
};
module.exports.weight = -1100;
