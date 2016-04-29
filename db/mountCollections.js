module.exports = function container (get) {
  return function task (cb) {
    get('vendor.run-series')(get('db.collections'), cb)
  }
}