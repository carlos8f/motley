module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'db',

  // functions
  'createCollection': require('./createCollection'),
  'mountCollections': require('./mountCollections'),

  // named collections
  'motley_sessions': require('./motley_sessions'),

  // collection registration
  'collections[]': ['#db.motley_sessions']
}