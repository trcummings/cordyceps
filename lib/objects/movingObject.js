var Box = require('./box');
var Ramp = require('./ramp');
var Shroom = require('./shroom');
var Trigger = require('./trigger');
var Ladder = require('./ladder');

var MovingObject = function (context, startX, startY, jumpHeight) {
  this.pos = { x: startX, y: startY };
  this.context = context;
  this.height = 20;
  this.width = 20;
  this.velocity = { x: 0, y: 0 };
  this.jumpHeight = jumpHeight;

  this.collisions = [];
  this.onDoor = {};
  this.onLadder = {};
  this.notOnLadder = true;
  this.grounded = false;
  this.jumping = false;
  this.facing = "r";

  this.gravity = 0.80;
  this.friction = 0.90;
  this.maxVel = 20;
};

MovingObject.prototype.processInteraction = function (game) {
  if (this.onDoor) {
    for (var doorName in this.onDoor) {
      if (this.onDoor.hasOwnProperty(doorName)) {
        if (this.onDoor[doorName]) {
          game.enterDoor(this.onDoor[doorName]);
        }
      }
    }
  } else {
    /// put stuff here later
  }
};

MovingObject.prototype.processInput = function (dir) {
  this.notOnLadder = true;

  for (var ladderId in this.onLadder) {
    if (this.onLadder.hasOwnProperty(ladderId)) {
      if (this.onLadder[ladderId]) {
        this.notOnLadder = false;
        this.gravity = 0;
        this.velocity.y = 0;
        this.moveOnLadder(dir);
      }
    }
  }

  if (this.notOnLadder) {
    if (dir === 'up') {
      this.jump();
    }
  }
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

MovingObject.prototype.moveOnLadder = function (dir) {
  if (dir === 'up') {
    this.goingDown = false;
    this.pos.y -= 4;
  } else if (dir === 'down') {
    this.goingDown = true;
    this.pos.y += 4;
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

MovingObject.prototype.move = function () {
  // run collision callbacks and clear array

  for (var ladderId in this.onLadder) {
    if (this.onLadder.hasOwnProperty(ladderId)) {
      if (this.onLadder[ladderId]) {
        this.notOnLadder = false;
      }
    }
  }

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
  this.velocity.x *= this.friction;

  // gravity
  if (this.velocity.y <= this.maxVel) {
    this.velocity.y += this.gravity;
  }
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
  } else if (obj instanceof Ladder && dir === 'bottom') {
    if (!this.goingDown) {
      this.boxCollision(obj, dir, oBump/5);
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
  var angle =  Math.atan(ramp.height/ramp.width);
  var distFromRampStart;
  var heightShouldBe;
  // add checks for which type but for now just do bl-tr

  if (ramp.slant === 'bl-tr') {
    distFromRampStart = (this.pos.x + this.width) - ramp.pos.x;
    heightShouldBe = ramp.pos.y - (Math.tan(angle) * distFromRampStart);

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
  } else if (ramp.slant === 'tl-br') {
    angle = 3.14 - angle;
    distFromRampStart = Math.abs(ramp.pos.x - this.pos.x);
    heightShouldBe = ramp.pos.y + this.pos.y;
    // var distShouldBe = -(heightShouldBe / Math.atan(angle)) - this.width;
    var distShouldBe = Math.abs(ramp.width - distFromRampStart);

    console.log('height shld: ' + heightShouldBe);
    console.log('dist should: ' + distShouldBe);
    console.log('dist is: ' + distFromRampStart);

    // console.log(this.pos.y + this.height - ramp.height);

    if (dir === "right") {
      this.velocity.x = 0;
      this.pos.x += oBump;
    } else {
      if (distFromRampStart + distShouldBe <= ramp.width) {
        console.log('sick');
        // this.pos.x = distShouldBe;
        // this.pos.y = heightShouldBe;
      }
    }
  }

        // // if (angle > 3.14/2 && this.facing === 'l') {
        // //   this.velocity.x *= 0;
        // if (this.facing === 'l') {
        //   this.velocity.x *= 0;
        //   // this.velocity.x *= Math.cos(angle);
        // } else
        //   this.velocity.x *= 1.05;
        // }
      // }
    // }
      // if (distFromRampStart < distShouldBe) {
      //   this.velocity.x = 0;
      //   this.pos.x += 1;
      //   // this.pos.y -= playXvel * Math.sin(angle);
      //   // this.velocity.y -= this.gravity - 1;
      //   // this.grounded = true;
      //   // this.jumping = false;
      // }
};



module.exports = MovingObject;
