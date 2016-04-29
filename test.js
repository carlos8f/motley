var motley = require('./')

var app = motley({
  _ns: 'motley',
  'hooks.listen[]': function container (get) {
    return function task (cb) {
      console.log('listening on http://localhost:' + get('site.server').address().port + '/');
      cb();
    }
  }
})

app.listen(function (err) {
  if (err) return console.error(err);
})