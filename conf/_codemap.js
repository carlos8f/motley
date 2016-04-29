module.exports = {
  _ns: 'motley',
  _folder: 'conf',

  'site.port': 3000,
  'site.title': 'new motley site',

  'middleware.static': {},
  'middleware.static.paths[]': 'public/**/*',
  'middleware.render': {},
  'middleware.render.paths[]': [
    'views/**/*.hbs',
    'views/**/*.handlebars',
    'views/**/*.md',
    'views/**/*.markdown'
  ],
  'middleware.session': {
    cookie: {
      maxAge: 86400 * 365
    },
    key: 'motley'
  },
  'middleware.addr.proxies[]': '127.0.0.1'
}