module.exports = function container (get, set) {
  return function runHook (name, cb) {
    get('vendor.console').log('motley: ' + name)
    get('vendor.run-series')(get('hooks.' + name), function (err) {
      if (err) return cb(err)
      get('vendor.console').log('motley: ' + name + ' complete.')
      cb()
    })
  }
}