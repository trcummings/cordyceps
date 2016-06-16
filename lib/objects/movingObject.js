var Box = require('./box');
var Ramp = require('./ramp');
var Shroom = require('./shroom');
var Trigger = require('./trigger');

var MovingObject = function (context, startX, startY, jumpHeight) {
  this.pos = { x: startX, y: startY };
  this.context = context;
  this.height = 20;
  this.width = 20;
  this.velocity = { x: 0, y: 0 };
  this.jumpHeight = jumpHeight;

  this.collisions = [];

  this.trailsOn = false;
  this.pastPos = [];
  this.frameCounter = 0;

  this.grounded = false;
  this.jumping = false;
  this.facing = "r";

  this.gravity = 0.80;
};

MovingObject.prototype.impulse = function (dir) {
  if (dir > 0) {
    this.facing = "r";
    this.velocity.x++;

  } else if (dir < 0) {
    this.facing = "l";
    this.velocity.x--;
  }
};

MovingObject.prototype.jump = function () {
  if (!this.jumping && this.grounded) {
    this.jumping = true;
    this.grounded = false;
    this.pos.y -= 5;
    this.velocity.y = this.jumpHeight;
  }
};

MovingObject.prototype.addPastPos = function () {
  if (this.frameCounter === 25) {
    this.frameCounter = 0;

    this.pastPos.push([this.pos.x, this.pos.y]);

    if (this.pastPos.length === 6) {
      this.pastPos.shift();
    }
  }

  this.frameCounter++;
};

MovingObject.prototype.move = function () {
  // run collision callbacks and clear array

  this.addPastPos();

  this.grounded = false;
  var rampIdx = [];
  this.collisions.forEach(function (colArray, index) {
    if (colArray[0] instanceof Ramp) {
      rampIdx.push(index);
    }
    if (rampIdx.length > 1) {
      this.collisions.splice(rampIdx[1], 1);
      this.pos.y -= 1;
    } else {
      this.collision(
        colArray[0], // obj
        colArray[1], // dir
        colArray[2] // oBump
      );
    }

  }.bind(this));
  this.collisions = [];

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

MovingObject.prototype.collision = function (obj, dir, oBump) {
  if (obj instanceof Box) {
    this.boxCollision(obj, dir, oBump);
  } else if (obj instanceof Ramp) {
    this.rampCollision(obj, dir, oBump);
  } else if (obj instanceof Shroom) {
    if (dir === 'bottom') {
      this.shroomCollision(obj, dir, oBump);
    } else {
      this.boxCollision(obj, dir, oBump);
    }
  } else if (obj instanceof Trigger) {
    obj.activate();
  }
};

MovingObject.prototype.shroomCollision = function (obj, dir, oBump) {
  this.jumping = true;
  this.grounded = false;
  this.pos.y -= oBump;
  this.velocity.y = -40;
};

MovingObject.prototype.boxCollision = function (obj, dir, oBump) {
  if (dir === "left") {
    this.pos.x += oBump;
    this.velocity.x = 0;

  } else if (dir === "right") {
    this.pos.x += oBump;
    this.velocity.x = 0;

  } else if (dir === "bottom") {
    this.pos.y += oBump;
    this.grounded = true;
    this.jumping = false;

  } else if (dir === "top") {
    this.pos.y += oBump;
    this.velocity.y *= -1;
  }
};

MovingObject.prototype.rampCollision = function (ramp, dir, oBump) {
  var playXvel = this.velocity.x;
  var angle = Math.atan(ramp.height/ramp.width);
  var distFromRampStart = (this.pos.x + this.width) - ramp.pos.x;
  var heightShouldBe = ramp.pos.y - (Math.tan(angle) * distFromRampStart);
  // add checks for which type but for now just do bl-tr

  if (ramp.slant === 'bl-tr') {
    if (dir === "left") {
      this.velocity.x = 0;
      this.pos.x += oBump;
    } else {
      if (this.facing === 'r') {
        this.velocity.x *= Math.cos(angle);
      } else {
        this.velocity.x *= 1.05;
      }
      if (this.pos.y + this.height - ramp.height >= heightShouldBe - 2) {
        this.pos.y -= playXvel * Math.sin(angle);
        this.velocity.y -= this.gravity - 1;
        this.grounded = true;
        this.jumping = false;
      }
    }
  }
};



module.exports = MovingObject;
