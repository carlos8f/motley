var Mayonnaise = require('mayonnaise').Mayonnaise
  , EventEmitter = require('events').EventEmitter
  , path = require('path')
  , inherits = require('util').inherits

function Motley (motleyFile, cwd) {
  EventEmitter.call(this);
  var app = this;
  this.setMaxListeners(0);
  this.ready = false;
  this.dir = cwd;
  this._conf = require('./plugins/conf')(this)(motleyFile, cwd);
  this._conf.on('ready', function (files) {
    app.conf = this.get();
    var plugins = require('./plugins/plugins')(app)();
    app.require = plugins.require.bind(plugins);
  });
}
inherits(Motley, EventEmitter);

Motley.prototype.close = function (code) {
  this.emit('close');
};

module.exports = function (motleyFile, cwd) {
  return new Motley(motleyFile, cwd);
};
module.exports.Motley = Motley;
