var app = require('./')
  , formidable = require('formidable')

// required to correct for early async middleware
require('./router');
app.router.add(-5000, ['post', 'put'], require('./pause'));

module.exports = function (req, res, next) {
  if (typeof req.paused === 'undefined') return next(new Error('body requires pause'));
  var form = new formidable.IncomingForm();
  try {
    form.parse(req, function (err, fields, files) {
      req.body = fields;
      req.files = files;
      next(err);
    });
  }
  catch (e) {
    // formidable throws if there is no content-type. weird.
    if (e.message === 'bad content-type header, no content-type') {
      e = null;
    }
    next(e);
  }
  req.resume();
};

module.exports.weight = -1000;
