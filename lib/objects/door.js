var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Door = function (options) {
  this.doorPath = options.doorPath;

  this.image = new Image();
  this.image.src = 'lib/sprites/labdoor1.png';

  StaticObject.call(this, options);
};

Util.inherits(Door, StaticObject);

Door.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.drawImage(this.image, newX - 10, newY - 10);
};

Door.prototype.collision = function (obj, dir) {
  if (dir) {
    obj.onDoor[this.doorPath.door] = this.doorPath;
  } else {
    obj.onDoor[this.doorPath.door] = false;
  }
};

module.exports = Door;
