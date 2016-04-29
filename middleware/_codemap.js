module.exports = {
  _ns: 'motley',
  _folder: 'middleware',

  'mountMiddleware': require('./mountMiddleware'),

  'addr': require('./addr'),
  'body': require('./body'),
  'expres': require('./expres'),
  'href': require('./href'),
  'login': require('./login'),
  'notfound': require('./notfound'),
  'pause': require('./pause'),
  'query': require('./query'),
  'render': require('./render'),
  'session': require('./session'),
  'static': require('./static'),

  'handlers[-60]': ['#middleware.static'],
  'handlers[-50]': ['#middleware.pause'],
  'handlers[-40]': ['#middleware.addr', '#middleware.href', '#middleware.query', '#middleware.expres'],
  'handlers[-30]': ['#middleware.session'],
  'handlers[-20]': ['#middleware.login'],
  'handlers[-10]': ['#middleware.render', '#middleware.body'],
  'handlers[0]': '#motley:routes.handlers',
  'handlers[100000]': ['#middleware.notfound'],

  'static.buffet': null,
  'render.handlebars': null,
  'render.downer': null,
  'router': null
}