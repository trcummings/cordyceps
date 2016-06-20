var Util = require('./util.js');
var SpriteUtil = require('./sprites/spriteUtil');
var MovingObject = require('./objects/movingObject');

var Player = function (context, startX, startY, jumpHeight) {
  var image = new Image();

  this.sprite = {
    image: image,
    frameIdx: 0
  };

  MovingObject.call(
    this, context, startX, startY, jumpHeight,
    { height: 80, width: 30 }
  );
};

Util.inherits(Player, MovingObject);

Player.prototype.render = function (camera) {
  var xPos = this.pos.x - camera.cpos.x;
  var yPos = this.pos.y - camera.cpos.y;

  var spriteOptions = SpriteUtil.player.spriteChoice(this);

  this.sprite.image.src = spriteOptions.url;
  this.sprite.height = spriteOptions.height;
  this.sprite.width = spriteOptions.width;
  this.sprite.numFrames = spriteOptions.numFrames;

  SpriteUtil.updateFrame(this);

  SpriteUtil.render({
    sprite: this.sprite,
    context: this.context,
    orientation: SpriteUtil.player.orientation,
    xPos: xPos - this.width - 5,
    yPos: yPos - this.sprite.height + this.height + 10,
    obj: this
  });
};

module.exports = Player;
