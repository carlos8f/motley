module.exports = function container (get) {
  return function body (req, res, next) {
    if (req.body) return next()
    if (typeof req.unpause === 'undefined') return next(new Error('body requires pause'))
    var form = new get('vendor.formidable').IncomingForm()
    form.parse(req, function (err, fields, files) {
      req.body = fields || {}
      req.files = files || {}
      next(err)
    })
    req.unpause()
  }
}