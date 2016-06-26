var ObjectUtil = require('../util/objectUtil.js');
var StaticObject = require('./staticObject');

var Ladder = function (options) {
  this.ladderId = options.ladderId;
  StaticObject.call(this, options);
};

ObjectUtil.inherits(Ladder, StaticObject);

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
    obj.onLadder[this.ladderId] = false;

    for (var ladderId in obj.onLadder) {
      if (obj.onLadder.hasOwnProperty(ladderId)) {
        if (obj.onLadder[ladderId]) {
          obj.gravity = 0;
          return;
        }
      }
    }
    obj.gravity = 0.80;
  }
};

module.exports = Ladder;
