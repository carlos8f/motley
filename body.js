var app = require('./')

if (!app.parseBody) {
  var formidable = require('formidable');
  app.parseBody = function parseBody (req, res, next) {
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
  require('./router');
  require('./pause');
  app.router.first(['post', 'put'], app.parseBody);
}
