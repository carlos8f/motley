module.exports = function container (get) {
  return get('vendor.middler')()
    .get('/', function (req, res, next) {
      res.json({
        'welcome': 'to your Motley site!'
      })
    })
    .handler
}