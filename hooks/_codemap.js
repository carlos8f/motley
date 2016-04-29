module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'hooks',

  // core hook registration
  'boot[]': [],
  'mount[-10]': '#db.mountCollections',
  'mount[0]': '#middleware.mountMiddleware',
  'listen[0]': '#site.listen',

  // functions
  'runHook': require('./runHook'),

  // results
  'booted': false,
  'mounted': false,
  'listened': false
}