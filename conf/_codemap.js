module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'conf',

  // db
  'db.mem': {
    hashKeys: true
  },

  // console
  'console': {
    timestamp: true,
    workerId: true,
    colors: true,
    silent: false
  },

  // site
  'site.port': 3000,
  'site.title': 'Motley core',

  // middleware
  'middleware.session': {
    cookie: {
      maxAge: 86400 * 365
    },
    key: 'motley'
  },
  'middleware.addr.proxies[]': '127.0.0.1'
}