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
        cb()
      }
    }
  })
}
catch (err) {
  console.error(err)
  process.exit(1)
}

app.listen(function (err) {
  if (err) return console.error(err)
})