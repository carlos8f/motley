module.exports = {
  _ns: 'motley',
  _folder: 'middleware',

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

  'handlers[-60]': ['#static'],
  'handlers[-50]': ['#pause'],
  'handlers[-40]': ['#addr', '#href', '#query', '#expres'],
  'handlers[-30]': ['#session'],
  'handlers[-20]': ['#login'],
  'handlers[-10]': ['#render', '#body'],
  'handlers[0]': ['#routes'],
  'handlers[100000]': ['#notfound'],

  'routes[]': [],

  'static.buffet': null,
  'render.handlebars': null,
  'render.downer': null
}