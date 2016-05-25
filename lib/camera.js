var Camera = function (height, width) {
  this.cpos = { x: 0, y: 0 }; // top left corner of camera object
  this.ppos = { x: 0, y: 0 }; // location of player object
  this.acel = { x: 0, y: 0 }; // acceleration of camera object
  this.height = height;
  this.width  = width;
  this.maxHeight = 6 * height;
  this.maxWidth = 6 * width;
  this.cullDistX = [0, width];  // "cull" distance. or, objects this far away from cam not rendered
  this.cullDistY = [0, height];
  this.bound = true;
  this.target = { x: 0, y: 0 };
  this.strength = 0;
  this.damper = 0;
};

Camera.prototype.squashCamera = function() {
  this.height -= 10;
  this.cullDistY[0] += 10;
  this.cullDistY[1] -= 10;
};

Camera.prototype.screenShake = function() {
  this.strength = 90;
  this.damper = 5;
};

Camera.prototype.move = function (playerCPosX, playerCPosY) {
  // get the target point
  this.target.x = playerCPosX - (this.width / 2);
  this.target.y = playerCPosY - (this.height / 2);

  // move this towards target point
  this.acel.x += (1 / 8) * (this.target.x - this.cpos.x);
  this.acel.y += (1 / 8) * (this.target.y - this.cpos.y);

  // camera shake update
  if (this.strength > 0) {
    var randx = Math.random() * 2 * this.strength - this.strength;
    var randy = Math.random() * 2 * this.strength - this.strength;
    this.acel.x += randx;
    this.acel.y += randy;
    this.strength -= this.damper;
  }

  // camera drag
  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.3;
  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.3;

  // camera verlet
  this.cpos.x += this.acel.x * 0.256;
  this.cpos.y += this.acel.y * 0.256;
  var cx = 2 * this.cpos.x - this.ppos.x;
  var cy = 2 * this.cpos.y - this.ppos.y;
  this.ppos.x = this.cpos.x;
  this.ppos.y = this.cpos.y;
  this.cpos.x = cx;
  this.cpos.y = cy;
  this.acel.x = 0;
  this.acel.y = 0;

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

module.exports = Camera;
