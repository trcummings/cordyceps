var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Door = function (options) {
  this.doorPath = options.doorPath;
  StaticObject.call(this, options);
};

Util.inherits(Door, StaticObject);

Door.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "brown";
  this.context.beginPath();
  this.context.fillRect(newX, newY, this.width, this.height);
};

Door.prototype.collision = function (obj, dir) {
  if (dir) {
    obj.onDoor[this.doorPath.door] = this.doorPath;
  } else {
    obj.onDoor[this.doorPath.door] = false;
  }
};

module.exports = Door;
