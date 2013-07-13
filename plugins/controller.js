var app = require('../');

if (!app.controller)  {
  var middler = require('middler');
  app.controller = function () {
    return middler();
  };
}
