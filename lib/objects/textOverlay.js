var TextOverlay = function (options) {
    this.message = options.message;
    this.fontSize = options.fontSize;
    this.alpha = 1;
    this.yPosMod = 0;
};

TextOverlay.prototype.draw = function(context, xPos, yPos) {
  context.beginPath();
  context.fillStyle = "white";
  context.globalAlpha = this.alpha;
  context.font = "italic "+this.fontSize+"pt Arial ";
  context.globalCompositeOperation = 'overlay';
  context.fillText(this.message, xPos, yPos + this.yPosMod);
  context.globalCompositeOperation = 'source-over';
  this.update();
  context.globalAlpha = 1;
};

TextOverlay.prototype.update = function () {
  if (this.alpha > 0) {
    this.alpha -= 0.005;
  }
  this.yPosMod += 1;
};

module.exports = TextOverlay;
