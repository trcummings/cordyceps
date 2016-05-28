var Ramp = function (options) {
    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
    this.width = options.width;
    this.height = options.height;
    this.slant = options.slant;
};
// Slant nomenclature
  // bl-tr bottom line and right line
  // br-tl bottom line and left line
  // tl-br top line and right line
  // tr-bl top line and left line

Ramp.prototype.draw = function (context, rampX, rampY) {
  context.fillStyle = "green";
  context.beginPath();

  // context.fillRect(rampX, rampY, this.width, this.height);

  if (this.slant === 'bl-tr') {
    context.moveTo(rampX, rampY + this.height);
    context.lineTo(this.width + rampX, rampY + this.height);
    context.lineTo(rampX + this.width, rampY);
    context.fill();
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
