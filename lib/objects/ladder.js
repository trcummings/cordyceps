var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Ladder = function (options) {
  this.ladderId = options.ladderId;
  StaticObject.call(this, options);
};

Util.inherits(Ladder, StaticObject);

Ladder.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "grey";
  this.context.beginPath();
  this.context.fillRect(newX, newY, this.width, this.height);
};

Ladder.prototype.collision = function (obj, dir, oBump) {
  if (dir) {
    obj.onLadder[this.ladderId] = true;
  } else {
    obj.gravity = 0.80;
    obj.onLadder[this.ladderId] = false;
  }
};

module.exports = Ladder;
