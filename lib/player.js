var Player = function (context) {
  this.cpos = { x: 0, y: 0 };
  this.ppos = { x: 0, y: 0 };
  this.acel = { x: 0, y: 1 }; // gravity
  this.context = context;
  this.jumping = false;
};

Player.prototype.render = function (xPos, yPos) {
  this.context.beginPath();
  this.context.fillStyle = "white";
  this.context.fillRect(xPos, yPos, 10, 10);
};

Player.prototype.impulse = function (axis, direction) {
  if (direction === 'pos') {
    direction = 1;
  } else {
    direction = -1;
  }

  this.acel.x = direction * 6;
};

Player.prototype.jump = function () {
  // if (this.jumping) {
    this.acel.y = -5;
  // }
};

Player.prototype.move = function () {
  // player drag
  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.93;
  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.93;

  // player verlet
  this.cpos.x += this.acel.x * 0.256;
  this.cpos.y += this.acel.y * 0.256;
  var px = 2 * this.cpos.x - this.ppos.x;
  var py = 2 * this.cpos.y - this.ppos.y;
  this.ppos.x = this.cpos.x;
  this.ppos.y = this.cpos.y;
  this.cpos.x = px;
  this.cpos.y = py;
  this.acel.x = 0;
  this.acel.y = 1;
};

module.exports = Player;
