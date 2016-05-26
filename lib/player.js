var Util = require('./util.js');

var Player = function (context, startX, startY) {
  this.cpos = { x: startX, y: startY }; // camera position vector center
  this.ppos = { x: startX, y: startY }; // player position center
  this.acel = { x: 0, y: 0 }; // gravity
  this.context = context;

  this.height = this.cpos.y;
  this.width = this.cpos.x;

  this.AABB = {
    tl: [this.cpos.x - 10, this.cpos.y - 10],
    tr: [this.cpos.x + 10, this.cpos.y - 10],
    bl: [this.cpos.x - 10, this.cpos.y + 10],
    br: [this.cpos.x + 10, this.cpos.y + 10]
  };

  this.grounded = false;
  this.jumping = false;
};

Player.prototype.render = function (xPos, yPos) {
  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.fillRect(
    xPos,
    yPos,
    20,
    20
  );
};

Player.prototype.impulse = function (axis, direction) {
  if (direction === 'pos') {
    direction = 1;
  } else {
    direction = -1;
  }

  if (axis === "x") {
    this.acel.x = direction * 6;
  } else {
    this.acel.y = direction * 6;
  }
};

Player.prototype.move = function () {
  // player drag
  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.93;
  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.93;

  // player verlet integration
  Util.verletTransform(this);


  // Grounding checks
  // if (!player.jumping && player.grounded) {
  //     player.jumping = true;
  //     player.grounded = false;
  //     player.velY = -player.speed * 2;
  // }
  //
  // player.grounded = false;
  // for (var i = 0; i < boxes.length; i++) {
  //     ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
  //
  //     var dir = colCheck(player, boxes[i]);
  //
  //     if (dir === "l" || dir === "r") {
  //         player.velX = 0;
  //         player.jumping = false;
  //     } else if (dir === "b") {
  //         player.grounded = true;
  //         player.jumping = false;
  //     } else if (dir === "t") {
  //         player.velY *= -1;
  //     }
  //
  // }
  //
  // if(player.grounded){
  //      player.velY = 0;
  // }

};

module.exports = Player;
