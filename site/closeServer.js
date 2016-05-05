module.exports = function container (get, set) {
  return function closeServer (cb) {
    var server = get('site.server')
    if (server) {
      get('vendor.console').log('motley: closing server...')
      server.close()
      get('site.server.sockets').forEach(function (socket) {
        socket.end()
        socket.unref()
      })
      server.unref()
      get('vendor.console').log('motley: server closed.')
      setImmediate(cb)
    }
    else setImmediate(cb)
  }
}