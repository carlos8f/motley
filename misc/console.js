module.exports = function container (get, set) {
  var conf = get('conf.console')
  var cluster = require('cluster')
  var colors = get('vendor.colors')
  return {
    _prefixArgs: function (args) {
      if (conf.workerId) {
        if (cluster.isMaster && Object.keys(cluster.workers).length) {
          var msg = '[master]'
          if (conf.colors) msg = colors.green(msg)
          args.unshift(msg)
        }
        else if (cluster.isWorker) {
          var msg = '[worker:' + cluster.worker.id + ']'
          if (conf.colors) msg = colors.cyan(msg)
          args.unshift(msg)
        }
      }
      if (conf.timestamp) {
        var date = new Date()
        var tzMatch = date.toString().match(/\((.*)\)/)
        var msg = date.toLocaleString() + ' ' + tzMatch[1]
        if (conf.colors) msg = colors.grey(msg)
        args.unshift(msg)
      }
    },
    log: function () {
      var args = [].slice.call(arguments)
      this._prefixArgs(args)
      console.log.apply(console, args)
    },
    error: function () {
      var args = [].slice.call(arguments)
      this._prefixArgs(args)
      var msg = '[ERROR]'
      if (conf.colors) msg = colors.red(msg)
      args.unshift(msg)
      console.error.apply(console, args)
    }
  }
}