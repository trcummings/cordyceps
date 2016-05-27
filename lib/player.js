var Util = require('./util.js');

var Player = function (context, startX, startY) {
  this.pos = { x: startX, y: startY };
  this.context = context;
  this.height = 20;
  this.width = 20;
  this.velocity = { x: 0, y: 0 };

  this.rightColliding = false;
  this.leftColliding = false;
  this.grounded = false;
  this.jumping = false;
  this.facing = "r";

  var image = new Image();
  image.src = 'http://www.learnjquery.org/newsletter/sonic.png';

  this.sprite = {
    img: image,
    frameIdx: 0,
    numFrames: 8,
    height: 100,
    width: 800
  };
};

Player.prototype.render = function (xPos, yPos) {
// img	Source image object	Sprite sheet
// sx	Source x	Frame index times frame width
// sy	Source y	0
// sw	Source width	Frame width
// sh	Source height	Frame height
// dx	Destination x	0
// dy	Destination y	0
// dw	Destination width	Frame width
// dh	Destination height	Frame height
// debugger;

  this.context.drawImage(
    this.sprite.img,
    this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
    0,
    this.sprite.width / this.sprite.numFrames,
    this.sprite.height,
    xPos,
    yPos - this.sprite.height,
    this.sprite.width / this.sprite.numFrames,
    this.sprite.height
  );

  if (this.velocity.x !== 0) {
    this.sprite.frameIdx++;
    if (this.sprite.frameIdx > this.sprite.numFrames) {
      this.sprite.frameIdx = 0;
    }
  } else {
    this.sprite.frameIdx = 0;
  }
  // this.context.beginPath();
  // this.context.fillStyle = "white";
  // this.context.fillRect(
  //   xPos,
  //   yPos,
  //   20,
  //   20
  // );
};

Player.prototype.impulse = function (dir) {
  if (dir > 0 ) {
    this.facing = "r";

    if (!this.rightColliding) {
      this.velocity.x++;
    }
  } else if (dir < 0) {
    this.facing = "l";

    if (!this.leftColliding) {
      this.velocity.x--;
    }
  }
};

Player.prototype.jump = function () {
  if (!this.jumping && this.grounded) {
      this.jumping = true;
      this.grounded = false;
      this.velocity.y = -30;
  }
};

Player.prototype.move = function () {

  if(this.grounded) {
    this.velocity.y = 0;
  }

  this.pos.x += this.velocity.x;
  this.pos.y += this.velocity.y;

  // friction
  this.velocity.x *= 0.90;

  // gravity
  this.velocity.y += 0.50;
};

module.exports = Player;
