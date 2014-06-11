module.exports = function (app) {
  return function (req, res, next) {
    res.vars.title = app.conf.title;
    res.vars.dir = app.dir;
    next();
  };
};
