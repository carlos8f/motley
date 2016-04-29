module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'hooks',

  // core hook registration
  'boot[]': [],
  'mount[-10]': '#motley:db.mountCollections',
  'mount[0]': '#motley:middleware.mountMiddleware',
  'listen[0]': '#motley:site.listen',

  // functions
  'runHook': require('./runHook'),

  // results
  'booted': false,
  'mounted': false,
  'listened': false
}