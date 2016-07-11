var TextOverlay = function (options) {
  this.pos = options.pos
  this.context = options.context
  this.message = options.message;
  this.fontSize = options.fontSize;
  this.overlayId = options.overlayId
  this.alpha = 1;
  this.yPosMod = 0;
};

TextOverlay.prototype.render = function(camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;
  var context = this.context

  context.beginPath();
  context.fillStyle = "white";
  // context.globalAlpha = this.alpha;
  context.font = "italic "+this.fontSize+"pt Arial ";
  // context.globalCompositeOperation = 'overlay';
  context.fillText(this.message, newX, newY + this.yPosMod);
  // context.globalCompositeOperation = 'source-over';
  // this.update();
  // context.globalAlpha = 1;
};

TextOverlay.prototype.collision = function () {
  // dont do shit buddeh!
}

TextOverlay.prototype.update = function () {
  if (this.alpha > 0) {
    this.alpha -= 0.005;
  }
  this.yPosMod += 1;
};

module.exports = TextOverlay;
