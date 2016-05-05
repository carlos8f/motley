var motley = require('./')

try {
  var app = motley({
    _ns: 'motley',
    _maps: [
      // require()'ed motley plugins go here.
    ],
    'hooks.listen[]': function container (get, set) {
      return function task (cb) {
        get('vendor.console').log('listening on http://localhost:' + get('site.server').address().port + '/')
        setImmediate(cb)
      }
    },
    'middleware[]': function container (get, set) {
      return function handler (req, res, next) {
        res.vars || (res.vars = {})
        res.vars.nonce = Math.random()
        next()
      }
    },
    'controllers[]': function container (get, set) {
      return get('controller')()
        .get('/', function (req, res, next) {
          res.json({
            'welcome': 'to ' + get('conf.site.title') + '!',
            'version': require('./package.json').version,
            'nonce': res.vars.nonce
          })
        })
    },
    'hooks.close[]': function container (get, set) {
      return function task (cb) {
        get('vendor.console').log('\n\nmotley says goodbye :)\n')
        setImmediate(cb)
      }
    }
  })
}
catch (err) {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
}

app.listen(function (err) {
  if (err) {
    console.error(err)
    console.error(err.stack)
    process.exit(1)
  }
  function onExit () {
    app.close(function (err) {
      if (err) {
        console.error(err)
        console.error(err.stack)
        process.exit(1)
      }
    })
  }
  process.once('SIGINT', onExit)
  process.once('SIGTERM', onExit)
})