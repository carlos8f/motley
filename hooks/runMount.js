module.exports = function container (get, set) {
  return function mount (cb) {
    if (!get('hooks.booted')) {
      get('hooks.runBoot')(function (err) {
        if (err) return cb(err);
        mount(cb)
      })
      return
    }
    get('hooks.runHook')('mount', function (err) {
      if (err) return cb(err)
      set('@hooks.mounted', true)
      cb()
    })
  }
}