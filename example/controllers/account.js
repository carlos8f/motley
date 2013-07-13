var app = require('motley');

require('motley/controller');
require('motley/users');

var controller = app.controller();
module.exports = controller.handler;

controller
  // just upsert a user and log them in
  .post('/login', function (req, res, next) {
    function logIn (err, user) {
      if (err) return next(err);
      if (user) {
        req.login(user);
        res.redirect('/');
      }
      else app.users.create({id: req.body.id}, logIn);
    }
    app.users.load(req.body.id, logIn);
  })
  // logout and redirect
  .get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  })