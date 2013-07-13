var app = require('motley')
  , marked = require('marked')

require('motley/controller');
require('../models/posts');

var controller = app.controller();
module.exports = controller.handler;

function requireAuth (req, res, next) {
  if (req.user) next();
  else res.renderStatus(403);
}

controller
  .get('/', function (req, res, next) {
    var posts = [];
    app.posts.tail({load: true}, function (err, chunk, next) {
      if (err) return next(err);
      posts = posts.concat(chunk);
      if (chunk.length && next) next();
      else res.render('index', {
        title: 'motley example',
        loggedIn: !!req.user,
        posts: posts
      });
    });
  })
  .get('/posts/:id', function (req, res, next) {
    app.posts.load(req.params.id, function (err, post) {
      if (err) return next(err);
      if (post) res.render('post', post);
      else res.renderStatus(404);
    });
  })
  .post('/posts', requireAuth, function (req, res, next) {
    req.body.body_safe = marked(req.body.body);
    req.body.author_id = req.user.id;
    app.posts.create(req.body, function (err, post) {
      if (err) return next(err);
      res.redirect('/posts/' + post.id);
    });
  })
  .put('/posts/:id', requireAuth, function (req, res, next) {
    req.body.id = req.params.id;
    app.posts.save(req.body, function (err, post) {
      if (err) return next(err);
      res.redirect('/posts/' + post.id);
    });
  })
  .delete('/posts/:id', requireAuth, function (req, res, next) {
    app.posts.destroy(req.params.id, function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  })
