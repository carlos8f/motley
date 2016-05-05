module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'site',

  // functions
  'listen': require('./listen'),
  'mountMiddleware': require('./mountMiddleware'),

  // results
  'server': require('./server'),
  'router': null
}