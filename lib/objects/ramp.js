var Ramp = function (options) {
    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
    this.ppos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
    this.width = options.width;
    this.height = options.height;
    this.slant = options.slant;
    this.rampX = undefined;
    this.rampY = undefined;
};
// Slant nomenclature
  // bl-tr bottom line and right line
  // br-tl bottom line and left line
  // tl-br top line and right line
  // tr-bl top line and left line

Ramp.prototype.draw = function (context) {
  context.fillStyle = "green";
  context.beginPath();

  // context.fillRect(rampX, rampY, this.width, this.height);

  if (this.slant === 'bl-tr') {
    context.moveTo(this.rampX, this.rampY + this.height);
    context.lineTo(this.width + this.rampX, this.rampY + this.height);
    context.lineTo(this.rampX + this.width, this.rampY);
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
