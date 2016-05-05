module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'hooks',

  // core hooks
  'boot[]': [],
  'mount[-10]': '#db.mountCollections',
  'mount[0]': '#site.mountMiddleware',
  'listen[0]': '#site.listen',
  'close[]': [],

  // functions
  'runHook': require('./runHook'),
  'runBoot': require('./runBoot'),
  'runMount': require('./runMount'),
  'runListen': require('./runListen'),
  'runClose': require('./runClose'),

  // results
  'booted': false,
  'mounted': false,
  'listened': false,
  'closed': false
}