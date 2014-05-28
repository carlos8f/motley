module.exports = function (app) {
  return app.collection({
    name: 'posts',
    save: function (post, cb) {
      if (!post.title) return cb(new Error('title is required!'));
      if (!post.body) return cb(new Error('body is required!'));
      if (!post.author_id) return cb(new Error('author_id is required!'));
      cb();
    }
  });
};
