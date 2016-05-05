module.exports = function container (get, set) {
  return function runClose (cb) {
    if (get('hooks.closed')) {
      return cb();
    }
    get('hooks.runHook')('close', function (err) {
      if (err) return cb(err)
      set('@hooks.closed', true)
      cb()
    })
  }
}