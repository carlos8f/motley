module.exports = function container (get, set) {
  return function task (cb) {
    var server = get('site.server')
    if (server) {
      // might throw if we're not currently listening...
      try {
        server.close(cb)
      }
      catch (err) {
        setImmediate(cb)
      }
    }
    else setImmediate(cb)
  }
}