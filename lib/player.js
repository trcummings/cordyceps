var Util = require('./util.js');
var Box = require('./objects/box');
var Ramp = require('./objects/ramp');

var Player = function (context, startX, startY) {
  this.pos = { x: startX, y: startY };
  this.context = context;
  this.height = 20;
  this.width = 20;
  this.velocity = { x: 0, y: 0 };

  this.grounded = false;
  this.jumping = false;
  this.facing = "r";

  this.gravity = 0.80;

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

Player.prototype.impulse = function (dir) {
  if (dir > 0) {
    this.facing = "r";
    this.velocity.x++;

  } else if (dir < 0) {
    this.facing = "l";
    this.velocity.x--;
  }
};

Player.prototype.jump = function () {
  if (!this.jumping && this.grounded) {
      this.jumping = true;
      this.grounded = false;
      this.velocity.y = -25;
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
  this.velocity.y += this.gravity;
};

Player.prototype.collision = function (object, dir) {

  if(object instanceof Box) {
    this.boxCollision(dir);
  } else if (object instanceof Ramp) {
    this.rampCollision(object, dir);
  } else {
    console.log("hit a trigger");
  }
};

Player.prototype.boxCollision = function (dir) {

  if (dir === "l") {
    this.velocity.x = 0;

  } else if (dir === "r") {
    this.velocity.x = 0;

  } else if (dir === "b") {
    this.grounded = true;
    this.jumping = false;

  } else if (dir === "t") {
    this.velocity.y *= -1;
  }
};

Player.prototype.rampCollision = function (ramp, dir) {
  // add checks for which type but for now just do bl-tr
  // write algorithm for smooth ascent based on start to end position maybe

  // this.pos.y -= 2 * ramp.width/ramp.cpos.x;
  // debugger;

  if (dir === "l") {
    this.velocity.x = 0;
    this.pos.x += 2;
  } else {
    var playXvel = this.velocity.x;
    var angle = Math.atan(ramp.height/ramp.width);
    var distFromRampStart = (this.pos.x + this.width) - ramp.ppos.x;
    var heightShouldBe = ramp.ppos.y - (Math.tan(angle) * distFromRampStart);

    // debugger;
    if (this.pos.y + this.height - ramp.height >= heightShouldBe - 2) {
      this.velocity.x *= Math.cos(angle);
      this.pos.y -= playXvel * Math.sin(angle) + 2;
      // this.velocity.y += 1  ;
      this.grounded = true;
      this.jumping = false;
    }
  }


  // var rampX = ramp.cpos.x - this.camera.cpos.x;
  // var rampY = ramp.cpos.y - this.camera.cpos.y;
  // this.pos.x += 2;
  //
  //
  // } else if (dir === "r") {
  //   this.velocity.x = 0;
  //
  // } else if (dir === "b") {
  //   this.grounded = true;
  //   this.jumping = false;
  //
  // } else if (dir === "t") {
  //   this.velocity.y *= -1;
  // }
};



module.exports = Player;
