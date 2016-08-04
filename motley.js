var codemap = require('codemap')

module.exports = function motley () {
  var rootMap = {
    _maps: [require('./_codemap')].concat([].slice.call(arguments)),

    'boot': '#motley:hooks.runBoot',
    'mount': '#motley:hooks.runMount',
    'listen': '#motley:hooks.runListen',
    'close': '#motley:hooks.runClose',

    'get': function container (get, set) {
      return get
    },
    'set': function container (get, set) {
      return set
    },
    'use': function container (get, set) {
      return function use () {
        ;[].slice.call(arguments).forEach(function (arg) {
          instance.parseMap(arg)
        })
        instance.validatePathCache()
      }
    }
  }
  var instance = codemap(rootMap)
  return instance.export()
}

module.exports.version = require('./package.json').version