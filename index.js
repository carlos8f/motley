var codemap = require('codemap')

module.exports = function motley () {
  var rootMap = {
    _maps: [require('./_codemap')].concat([].slice.call(arguments)),

    'boot': function container (get, set) {
      return function boot (cb) {
        get('motley:hooks.runHook')('boot', function (err) {
          if (err) return cb(err)
          set('@motley:hooks.booted', true)
          cb()
        });
      }
    },
    'mount': function container (get, set) {
      return function mount (cb) {
        if (!get('motley:hooks.booted')) {
          get('boot')(function (err) {
            if (err) return cb(err);
            mount(cb)
          })
          return
        }
        get('motley:hooks.runHook')('mount', function (err) {
          if (err) return cb(err)
          set('@motley:hooks.mounted', true)
          cb()
        })
      }
    },
    'listen': function container (get, set) {
      return function listen (cb) {
        if (!get('motley:hooks.mounted')) {
          get('mount')(function (err) {
            if (err) return cb(err)
            listen(cb)
          })
          return;
        }
        get('motley:hooks.runHook')('listen', function (err) {
          if (err) return cb(err)
          set('@motley:hooks.listened', true)
          cb()
        })
      }
    }
  }
  return codemap(rootMap).export()
}