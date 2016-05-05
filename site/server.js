var http = require('http')

module.exports = function container (get, set) {
  var server = http.createServer()
  var sockets = [];
  server.on('connection', function (socket) {
    sockets.push(socket)
  })
  set('@site.server.sockets', sockets)
  return server
}