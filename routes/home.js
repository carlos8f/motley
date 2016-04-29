module.exports = function container (get) {
  return get('vendor.middler')()
    .get('/', function (req, res, next) {
      res.json({
        'welcome': 'to ' + get('conf.site.title') + '!',
        'version': require('../package.json').version
      })
    })
    .handler
}