module.exports = {
  // meta
  _ns: 'motley',
  _folder: 'site',

  // functions
  'listen': require('./listen'),
  'mountMiddleware': require('./mountMiddleware'),
  'closeServer': require('./closeServer'),

  // results
  'server': require('./server'),
  'server.sockets': [],
  'router': null
}