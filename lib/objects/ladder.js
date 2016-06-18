var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Ladder = function (options) {
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

Ladder.prototype.collision = function (obj, dir) {
  if (dir) {
    obj.onLadder = true;
    obj.gravity = 0;
    obj.velocity.y = 0;
    if (dir !== 'bottom' && dir !== 'top') {
      obj.friction = 0.80;
    }
  } else {
    obj.onLadder = false;
    obj.gravity = 0.80;
    obj.friction = 0.90;
  }
};

module.exports = Ladder;
