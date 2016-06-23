var ObjectUtil = require('../util/objectUtil.js');
var MovingObject = require('./movingObject');

var ChasingEnemy = function (options) {
  this.pos = { x: options.pos.x, y: options.pos.y };
  this.height = options.height;
  this.width = options.width;
  this.callback = options.callback;
  this.activated = options.activated;
  this.triggerId = options.triggerId;
  this.targetX = null;
  this.facing = 'l';
  this.game = options.game;
  this.speed = 5;

  MovingObject.call(
    this, options.context, this.pos.x, this.pos.y, null,
    { height: 90, width: 40 }
  );
};

ObjectUtil.inherits(ChasingEnemy, MovingObject);

ChasingEnemy.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  this.context.fillStyle = "pink";
  this.context.beginPath();
  this.context.fillRect(newX, newY, this.width, this.height);
};

ChasingEnemy.prototype.move = function (target) {
  if (this.activated) {
    this.targetX = target.pos.x - this.width - this.pos.x + target.width;
    if (this.targetX < -5) {
      this.pos.x -= this.speed;
      this.facing = 'l';
    } else if (this.targetX >= 5) {
      this.facing = 'l';
      this.pos.x += this.speed;
    } else {
      this.pos.x += 0;
    }
  }
};

ChasingEnemy.prototype.collision = function (obj, dir) {
  if (dir) {
    this.game.endGame();
  }
};

module.exports = ChasingEnemy;
