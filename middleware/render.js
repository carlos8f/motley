var app = require('../');

module.exports = require('templ')(app.conf.render);
module.exports.weight = -1000;
