var Util = require('../util.js');
var Trigger = require('./trigger');

var Door = function (options) {
    Trigger.call(this, options);
};

Util.inherits(Door, Trigger);

Door.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "brown";
  this.context.beginPath();
  this.context.fillRect(newX, newY, this.width, this.height);
};

module.exports = Door;
