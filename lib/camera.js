var ObjectUtil = require('./util/objectUtil.js');

var Camera = function (height, width, world) {
  this.world = world;
  this.cpos = { x: 50, y: world.height - 50 }; // "current pos" top left corner of camera object
  this.ppos = { x: 50, y: world.height - 50 }; // "past pos"
  this.acel = { x: 0, y: 0 }; // acceleration of camera object

  this.setCameraDimensions(height, width, world);
  this.target = { x: 0, y: 0 }; // target position

  // for drawing camera and binding it to world space
  this.maxHeight = this.world.height;
  this.maxWidth = this.world.width;
  this.cullDistX = {left: 0, right: width};  // "cull" distance. or, objects this far away from cam not rendered
  this.cullDistY = {top: 0, bottom: height};
  this.bound = true;

  // for screenshake
  this.strength = 0;
  this.damper = 0;
};

Camera.prototype.setCameraDimensions = function (height, width, world) {
  if (world.height <= height) {
    this.height = world.height;
  } else {
    this.height = height;
  }

  if (world.width <= width) {
    this.width = world.width;
  } else {
    this.width = width;
  }
};

Camera.prototype.squashCamera = function() {
  this.height -= 10;
  // this.cullDistY.top += 10;
  // this.cullDistY.bottom -= 10;
};

Camera.prototype.screenShake = function() {
  this.strength = 90;
  this.damper = 5;
};

Camera.prototype.move = function (targetObj) {
  // get the target point
  if (targetObj.facing === "r") {
    this.target.x = targetObj.pos.x - (this.width / 6); //sets target x to center of screen relative to player
  } else {
    this.target.x = targetObj.pos.x - (5 * this.width / 6);
  }
  this.target.y = targetObj.pos.y - (this.height / 1.3); // same but with y

  var ratio = this.world.game.height / this.height;
  // move camera towards target point
  this.acel.x += (1 / 8) * (this.target.x - this.cpos.x); // acceleration vector
  this.acel.y += (this.target.y - this.cpos.y);

  // camera shake update
  if (this.strength > 0) {
    var randx = Math.random() * 2 * this.strength - this.strength;
    var randy = Math.random() * 2 * this.strength - this.strength;
    this.acel.x += randx;
    this.acel.y += randy;
    this.strength -= this.damper;
  }

  // camera drag
  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.5;
  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.5;

  // camera verlet
  ObjectUtil.verletTransform(this);

  // bind camera to world edges
  if (this.bound) {

    // flush camera -- x bounds
    this.cpos.x = Math.min(this.cpos.x, this.maxWidth - this.width);
    this.cpos.x = Math.max(this.cpos.x, 0);

    // flush camera -- y bounds
    this.cpos.y = Math.min(this.cpos.y, this.maxHeight - this.height);
    this.cpos.y = Math.max(this.cpos.y, 0);
  }
};


Camera.prototype.startHallwaySquash = function (desiredHeight) {
  // this.hallwaySquash(player);
  this.hallwaySquash(desiredHeight);
};

Camera.prototype.startHallwayWiden = function (desiredHeight) {
  // this.hallwaySquash(player);
  this.hallwayWiden(desiredHeight);
};

Camera.prototype.hallwaySquash = function (desiredHeight) {
  if (this.height >= desiredHeight) {
    // if (player.velocity.x > 0.5) {
      this.height -= 5;
    // }
  }
  // else if (this.height <= this.world.height) {
  //   if (player.velocity.x < -0.5) {
  //     this.height += 0.2;
  //   }
  // }

  this.squashCam = window.setTimeout(this.hallwaySquash.bind(this, desiredHeight), 60);
};

Camera.prototype.hallwayWiden = function (desiredHeight) {
  if (this.height <= desiredHeight) {
    this.height += 5;
  }

  this.squashCam = window.setTimeout(this.hallwayWiden.bind(this, desiredHeight), 60);
};

Camera.prototype.endHallwaySquash = function () {
  window.clearTimeout(this.squashCam);
};

Camera.prototype.endHallwayWiden = function () {
  window.clearTimeout(this.squashCam);
};

module.exports = Camera;
