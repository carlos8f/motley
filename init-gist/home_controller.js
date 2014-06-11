module.exports = function (app) {
  return app.controller()
    .get('/', function (req, res, next) {
      res.render('index');
    })
};
