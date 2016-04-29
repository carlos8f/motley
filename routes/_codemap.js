module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'routes',

  // named routes
  'home': require('./home'),

  // stack definition
  'handlers[0]': '#motley:routes.home'
}