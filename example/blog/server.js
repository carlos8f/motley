module.exports = require('codemap')({
  _ns: 'motley',
  _maps: [
    require('motley'),
    require('./_codemap')
  ],
  'boot': function (get) {
    return function (cb) {
      get('db.connect')(function (err) {
        if (err) return cb(err);
        get('site.listen')(cb);
      });
    };
  },
  'server': '#site.server'
}).export();

app.boot(function (err) {
  if (err) throw err;
  console.log('server listening at http://127.0.0.1:' + app.server.address().port + '/');
});
