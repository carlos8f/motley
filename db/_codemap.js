module.exports = {
  _ns: 'motley',
  _folder: 'db',

  'redis_client': null,
  'mongo_client': null,
  'connect': require('./connect'),
  'createCollection': require('./createCollection')
}