var Mayonnaise = require('mayonnaise').Mayonnaise
  , EventEmitter = require('events').EventEmitter
  , path = require('path')
  , inherits = require('util').inherits
  , confReader = require('./plugins/conf')

function Motley (motleyFile, cwd) {
  EventEmitter.call(this);
  var app = this;
  this.setMaxListeners(0);
  this.started = false;
  this.ready = false;
  this.dir = cwd;
  var self = this;
  this._confReader = confReader(this);
  this._conf = this._confReader(motleyFile, cwd);
  this.names = [];
  this.on('routes', function () {
    setImmediate(function () {
      self.started = true;
      self.ready = true;
      self.emit('ready');
    });
  });
  this.on('reboot', function () {
    self.ready = false;
    self.close();
    self.names.forEach(function (name) {
      delete self[name];
    });
    self.names = [];
    self._conf = self._confReader(motleyFile, cwd);
  });
}
inherits(Motley, EventEmitter);

Motley.prototype.close = function (code) {
  this.emit('close');
};

Motley.prototype.reboot = function () {
  if (this.ready) this.emit('reboot');
};

module.exports = function (motleyFile, cwd) {
  return new Motley(motleyFile, cwd);
};
module.exports.Motley = Motley;
