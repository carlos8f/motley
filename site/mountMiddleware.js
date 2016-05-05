module.exports = function container (get, set) {
  return function task (cb) {
    var router = get('vendor.middler')(get('site.server'))
    get('middleware').forEach(function (handler) {
      router.add(handler.handler || handler)
    })
    set('@site.router', router)
    setImmediate(cb)
  }
}