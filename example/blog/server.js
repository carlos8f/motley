var motley = require('motley');
var app = motley(require('./_codemap'));
app.listen(function (err) {
  if (err) throw err;
  console.log('server listening at http://localhost:' + app.server.address().port + '/');
});