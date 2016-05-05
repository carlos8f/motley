module.exports = function container (get, set) {
  return function runBoot (cb) {
    get('hooks.runHook')('boot', function (err) {
      if (err) return cb(err)
      set('@hooks.booted', true)
      cb()
    })
  }
}