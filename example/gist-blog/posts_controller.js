var marked = require('marked');

function requireAuth (req, res, next) {
  if (req.user) next();
  else res.renderStatus(403);
}

module.exports = function (app) {
  app.require('posts');
  return app.controller()
    .get('/', function (req, res, next) {
      var posts = [];
      app.posts.tail({load: true}, function (err, chunk, next) {
        if (err) return next(err);
        posts = posts.concat(chunk);
        if (chunk.length && next) next();
        else res.render('index', {
          title: 'motley example',
          user: req.user,
          posts: posts
        });
      });
    })
    .get('/posts/:id', function (req, res, next) {
      app.posts.load(req.params.id, function (err, post) {
        if (err) return next(err);
        if (post) {
          res.vars.post = post;
          res.vars.title = post.title;
          res.render('post');
        }
        else res.renderStatus(404);
      });
    })
    .post('/posts', requireAuth, function (req, res, next) {
      req.body.body_safe = marked(req.body.body);
      req.body.author_id = req.user.id;
      app.posts.create(req.body, function (err, post) {
        if (err) return next(err);
        res.flash('post successful');
        res.redirect('/posts/' + post.id);
      });
    })
};
