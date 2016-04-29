module.exports = {
  _ns: 'motley',
  _folder: 'db',

  'createCollection': require('./createCollection'),
  'mountCollections': require('./mountCollections'),

  'sessions': require('./sessions'),
  'users': require('./users'),

  'collections[]': ['#db.sessions', '#db.users']
}