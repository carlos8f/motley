module.exports = function (app) {
  return function (req, res, next) {
    if (!req.session) return next(new Error('flash requires session'));
    if (!res.render) return next(new Error('flash requires render'));

    res.flash = function (message, type) {
      req.session.messages || (req.session.messages = []);
      req.session.messages.push({type: type || 'success', message: message});
    };

    var _render = res.render;
    res.render = function () {
      res.vars.messages || (res.vars.messages = req.session.messages || []);
      delete req.session.messages;
      _render.apply(res, [].slice.call(arguments));
    };

    next();
  };
};
module.exports.weight = -400;
