var http = require('http')

module.exports = function container (get) {
  return http.createServer()
}