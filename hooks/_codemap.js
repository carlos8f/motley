module.exports = {
  _ns: 'motley',
  _folder: 'hooks',

  'boot[]': [],
  'mount[-10]': '#motley:db.mountCollections',
  'mount[0]': '#motley:middleware.mountMiddleware',
  'listen[0]': '#motley:site.listen',

  'runHook': require('./runHook'),

  'booted': false,
  'mounted': false,
  'listened': false
}