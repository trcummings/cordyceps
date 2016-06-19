var Util = require('./util.js');
var MovingObject = require('./objects/movingObject');

var Player = function (context, startX, startY, jumpHeight) {
  var image = new Image();
  image.src = 'http://www.learnjquery.org/newsletter/sonic.png';

  this.sprite = {
    img: image,
    frameIdx: 0,
    numFrames: 8,
    height: 100,
    width: 800
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

  if (this.facing == "r") {
    this.sprite.img.src = 'lib/sprites/spriteImages.js/sonic-sprite-right.png';
  } else {
    this.sprite.img.src = 'lib/sprites/spriteImages.js/sonic-sprite-left.png';
  }

  if(!this.interval) {
    this.interval = window.setInterval(function () {
      if (!this.jumping && (this.velocity.x > 2 || this.velocity.x < -2)) {
        if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
          this.sprite.frameIdx = 0;
        }
        this.sprite.frameIdx++;
      } else {
        this.sprite.frameIdx = 7;
      }
    }.bind(this), 80);
  }

  this.context.drawImage(
    this.sprite.img,
    this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
    0,
    this.sprite.width / this.sprite.numFrames,
    this.sprite.height,
    xPos - this.width - 5,
    yPos - this.sprite.height + this.height + 10,
    this.sprite.width / this.sprite.numFrames,
    this.sprite.height
  );
};



module.exports = Player;
