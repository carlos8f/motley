var app = require('./');

module.exports = require('expres').middleware;
module.exports.weight = -1000;
