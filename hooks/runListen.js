module.exports = function container (get, set) {
  return function listen (cb) {
    if (!get('hooks.mounted')) {
      get('hooks.runMount')(function (err) {
        if (err) return cb(err)
        listen(cb)
      })
      return
    }
    get('hooks.runHook')('listen', function (err) {
      if (err) return cb(err)
      set('@hooks.listened', true)
      cb()
    })
  }
}