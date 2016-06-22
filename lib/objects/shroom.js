var ObjectUtil = require('../util/objectUtil.js');
var StaticObject = require('./staticObject');

var Shroom = function (options) {
  StaticObject.call(this, options);
};

ObjectUtil.inherits(Shroom, StaticObject)

Shroom.prototype.collision = function () {
  // doesn't do shit
};

// Shroom.prototype.render = function (camera) {
//   var newX = this.pos.x - camera.cpos.x;
//   var newY = this.pos.y - camera.cpos.y;
//
//   // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
//   //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
//
//     this.context.fillStyle = "green";
//     this.context.beginPath();
//     this.context.fillRect(newX, newY, this.width, this.height);
//   // }
// };

module.exports = Shroom;
