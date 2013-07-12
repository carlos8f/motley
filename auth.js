var app = require('./');

module.exports = function (req, res, next) {
  if (!req.session) return next(new Error('auth requires session'));
  req.login = function (user) {
    req.user = user;
    req.session.auth = user.id;
  };
  req.logout = function () {
    req.user = null;
    req.session.auth = null;
  };
  if (req.session.auth && app.users) {
    app.users.load(req.session.auth, function (err, user) {
      if (err) return next(err);
      if (user) req.login(user);
      else req.logout();
      next();
    });
  }
  else next();
};
module.exports.weight = -1000;
