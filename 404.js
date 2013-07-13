var app = require('./');

if (!app.notFound) {
  app.notFound = function (req, res, next) {
    if (!res.send) return next(new Error('404 requires expres'));
    res.send(404);
  };
}
