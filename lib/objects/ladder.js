var ObjectUtil = require('../util/objectUtil.js');
var StaticObject = require('./staticObject');

var Ladder = function (options) {
  this.ladderId = options.ladderId;
  this.ladderTop = new Image();
  this.ladderBottom = new Image();
  this.ladderMid = new Image();

  this.ladderTop.src = 'lib/sprites/ladder/laddertop.png';
  this.ladderBottom.src = 'lib/sprites/ladder/ladderbottom.png';
  this.ladderMid.src = 'lib/sprites/ladder/laddermid.png';

  StaticObject.call(this, options);
};

ObjectUtil.inherits(Ladder, StaticObject);

Ladder.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;
  var midsections = Math.round(this.height / 10) - 2;

  // top
  this.context.drawImage(this.ladderTop, newX - 10, newY - 10);

  for (var i = 1; i < midsections; i++) {
    this.context.drawImage(this.ladderMid, newX - 10, (newY + 10 * i - 15));
  }

  // bottom
  this.context.drawImage(this.ladderBottom, newX - 10, newY + this.height - 35);

  // this.context.fillStyle = "grey";
  // this.context.beginPath();
  // this.context.fillRect(newX, newY, this.width, this.height);
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
