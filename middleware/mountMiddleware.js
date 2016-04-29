module.exports = function container (get, set) {
  return function task (cb) {
    var router = get('vendor.middler')(get('site.server'))
    get('middleware.handlers').forEach(function (handler) {
      router.add(handler)
    })
    set('@middleware.router', router)
    setImmediate(cb)
  }
}