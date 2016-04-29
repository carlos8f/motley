module.exports = function container (get, set) {
  return function (name, cb) {
    get('vendor.run-series')(get('hooks.' + name), cb)
  }
}