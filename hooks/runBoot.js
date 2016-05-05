module.exports = function container (get, set) {
  return function boot (cb) {
    get('hooks.runHook')('boot', function (err) {
      if (err) return cb(err)
      set('@hooks.booted', true)
      cb()
    })
  }
}