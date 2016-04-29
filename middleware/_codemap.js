module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'middleware',

  // functions  
  'mountMiddleware': require('./mountMiddleware'),

  // named middleware
  'addr': require('./addr'),
  'body': require('./body'),
  'expres': require('./expres'),
  'href': require('./href'),
  'notfound': require('./notfound'),
  'pause': require('./pause'),
  'query': require('./query'),
  'session': require('./session'),

  // stack definition
  'handlers[-50]': ['#middleware.pause'],
  'handlers[-40]': ['#middleware.addr', '#middleware.href', '#middleware.query', '#middleware.expres'],
  'handlers[-30]': ['#middleware.session'],
  'handlers[-10]': ['#middleware.body'],
  'handlers[0]': '#routes.handlers',
  'handlers[100000]': ['#middleware.notfound'],

  // results
  'router': null
}