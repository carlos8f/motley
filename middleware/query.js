module.exports = function container (get) {
  return function query (req, res, next) {
    if (!req.query) {
      if (!req.href) return next(new Error('query requires href'))
      try {
        req.query = get('vendor.qs').parse(req.href.query)
      }
      catch (e) {
        return next(e)
      }
    }
    next()
  }
}