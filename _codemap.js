module.exports = {
  _ns: 'motley',
  _maps: [
    require('./assets/_codemap'),
    require('./bin/_codemap'),
    require('./collections/_codemap'),
    require('./middleware/_codemap'),
    require('./plugins/_codemap'),
    require('./vendor/_codemap')
  ],
  'conf.db.adapter': 'mem',
  'conf.db.adapters[]': [
    'mem',
    'redis',
    'mongo'
  ],
  'conf.db.name': 'motley',
  'conf.db.host': 'localhost',
  'conf.db.user': 'root',
  'conf.db.password': null,
  'conf.db.redis_client': null,
  'conf.db.redis_port': 6379,
  'conf.db.redis_db': 0,
  'conf.db.mongo_client': null,
  'conf.db.mongo_port': 28017,
  'conf.site.port': 3000,
  'conf.site.title': 'new motley site',
  'conf.site.public[]': 'public/**/*',
  'conf.site.views[]': [
    'views/**/*.hbs'
    'views/**/*.handlebars'
    'views/**/*.md'
    'views/**/*.markdown'
  ]
}
