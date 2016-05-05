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
    }
  }
  return codemap(rootMap).export()
}

module.exports.version = require('./package.json').version