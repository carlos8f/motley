module.exports = function container (get) {
  return function notfound (req, res, next) {
    if (res.renderStatus) res.renderStatus(404)
    else if (res.send) res.send(404)
    else next(new Error('notfound requires expres or render'))
  }
}