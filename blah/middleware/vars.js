module.exports = function (app) {
  return function (req, res, next) {
    res.vars.title = app.conf.title;
    next();
  };
};
