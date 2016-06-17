var StaticObject = function (options) {
  this.pos = { x: options.pos.x, y: options.pos.y }; // camera position vector center
  this.context = options.context;
  this.width = options.width;
  this.height = options.height;

  this.collisions = [];
};

StaticObject.prototype.collision = function () {
  // don't do anything
};

StaticObject.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
  //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {

    this.context.fillStyle = "green";
    this.context.beginPath();
    this.context.fillRect(newX, newY, this.width, this.height);
  // }
};

module.exports = StaticObject;
