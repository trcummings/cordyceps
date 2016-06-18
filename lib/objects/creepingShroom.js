var Util = require('../util.js');
var MovingObject = require('./movingObject');

var CreepingShroom = function (options) {
  this.pos = { x: options.pos.x, y: options.pos.y };
  this.height = options.height;
  this.width = options.width;
  this.growsToward = options.growsToward;
  MovingObject.call(this, options.context, this.pos.x, this.pos.y);
};

Util.inherits(CreepingShroom, MovingObject);

CreepingShroom.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "purple";
  this.context.beginPath();
  this.context.fillRect(newX, newY, this.width, this.height);
};

CreepingShroom.prototype.move = function () {
  if (this.growsToward === 'right') {
    this.height = this.height;
    this.width += 0.5;
  }
};

CreepingShroom.prototype.collision = function (obj, dir) {
  if (dir) {
    debugger;
  }
};

module.exports = CreepingShroom;
