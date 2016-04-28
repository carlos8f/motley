module.exports = function container (get) {
  return function (req, res, next) {
    if (res.renderStatus) res.renderStatus(404);
    else if (res.send) res.send(404);
    else next(new Error('handle404 requires expres or render'));
  };
};
