module.exports = function container (get) {
  return function mountCollections (cb) {
    get('vendor.run-series')(get('db.collections'), cb)
  }
}