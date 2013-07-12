var app = require('./');

if (!app.qs) {
  app.qs = require('querystring');
}

if (!app.parseQuery) {
  require('./router');
  app.parseQuery = function parseQuery (req, res, next) {
    if (!req.query) {
      try {
        var split = req.url.split('?');
        if (split.length < 2) return next();
        req.query = app.qs.parse(split[1]);
      }
      catch (e) {
        return next(e);
      }
    }
    next();
  };
  app.router.first(app.parseQuery);
}
