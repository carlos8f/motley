module.exports = {
  _ns: 'motley',
  _folder: 'conf',

  'db.adapter': 'mem',
  'db.redis': {
    host: 'localhost',
    port: 6379,
    db: 0,
    password: null,
    key_prefix: 'motley'
  },
  'db.mongo': {
    host: 'localhost',
    port: 28017,
    db: 'motley'
  },

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