module.exports = function container (get, set) {
  return function createMemCollection (name, options) {
    return function mountMemCollection (cb) {
      var coll = get('vendor.sosa_mem')()(name, options);
      set('@db.' + name, coll);
      setImmediate(cb);
    }
  }
}