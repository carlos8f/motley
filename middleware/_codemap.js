module.exports = {
  // meta
  _ns: 'motley',

  // named middleware
  'middleware.addr': require('./addr'),
  'middleware.body': require('./body'),
  'middleware.expres': require('./expres'),
  'middleware.href': require('./href'),
  'middleware.notfound': require('./notfound'),
  'middleware.pause': require('./pause'),
  'middleware.query': require('./query'),
  'middleware.session': require('./session'),

  // stack definition
  'middleware[-50]': ['#middleware.pause'],
  'middleware[-40]': ['#middleware.addr', '#middleware.href', '#middleware.query', '#middleware.expres'],
  'middleware[-30]': ['#middleware.session'],
  'middleware[-10]': ['#middleware.body'],
  'middleware[10]': '#controllers',
  'middleware[100000]': ['#middleware.notfound']
}