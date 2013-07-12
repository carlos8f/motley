var app = require('./');

if (!app.auth) {
  require('./router');
  require('./session');
  app.auth = function auth (req, res, next) {
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
  app.router.first(app.auth);
}

if (!app.requireAuth) {
  require('./render');
  app.requireAuth = function (req, res, next) {
    if (!req.user) return res.renderStatus(403);
    next();
  };
}
