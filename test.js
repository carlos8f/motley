var motley = require('./')

var app = motley()

app.listen(function (err) {
  if (err) throw err
  console.log('listening...')
})