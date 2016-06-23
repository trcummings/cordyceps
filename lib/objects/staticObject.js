var StaticObject = function (options) {
  this.pos = { x: options.pos.x, y: options.pos.y }; // camera position vector center
  this.context = options.context;
  this.width = options.width;
  this.height = options.height;

  if (options.img) {
    this.image = new Image();
    this.image.src = options.img;
  }
};

StaticObject.prototype.collision = function () {
  // don't do anything
};

StaticObject.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
  //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
  // debugger;
  if (this.image) {
    this.context.drawImage(this.image, newX - 10, newY - 10);
  } else {
    this.context.fillStyle = "#1F2224";
    this.context.beginPath();
    this.context.fillRect(newX, newY, this.width, this.height);
  }

  // }
};

module.exports = StaticObject;
