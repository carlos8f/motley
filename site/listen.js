module.exports = function container (get) {
  return function listen (cb) {
    get('site.server').listen(get('conf.site.port'), cb)
  }
}