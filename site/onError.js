module.exports = function container (get, set) {
  return function onError (err, req, res) {
    get('console').error(req.method, req.url, err)
    res.send(500)
  }
}