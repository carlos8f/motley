var app = require('./');

module.exports = require('buffet')(app.conf.static);
module.exports.weight = -1000;
