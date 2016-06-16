var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Ramp = function (options) {
    this.slant = options.slant;
    this.rampX = undefined;
    this.rampY = undefined;
    StaticObject.call(this, options);
};

Util.inherits(Ramp, StaticObject);
// Slant nomenclature
  // bl-tr bottom line and right line
  // br-tl bottom line and left line
  // tl-br top line and right line
  // tr-bl top line and left line

Ramp.prototype.render = function (camera) {
  this.rampX = this.pos.x - camera.cpos.x;
  this.rampY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "green";
  this.context.beginPath();

  // context.fillRect(rampX, rampY, this.width, this.height);

  if (this.slant === 'bl-tr') {
    this.context.moveTo(this.rampX, this.rampY + this.height);
    this.context.lineTo(this.width + this.rampX, this.rampY + this.height);
    this.context.lineTo(this.rampX + this.width, this.rampY);
    this.context.fill();
  }

  // if (this.slant === 'br-tl') {
  //   context.lineTo();
  //   context.lineTo();
  //   this.context.fill();
  // }
  //
  // if (this.slant === 'tl-br') {
  //
  // }
  //
  // if (this.slant === 'bl-tr') {
  //
  // }
};

module.exports = Ramp;
