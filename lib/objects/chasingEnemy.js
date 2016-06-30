var ObjectUtil = require('../util/objectUtil.js');
var SpriteUtil = require('../util/spriteUtil.js');
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

  this.imgOptions = options.imgOptions;
  this.sprite = {
    image: new Image(),
    frameIdx: 0
  };
  this.sprite.image.src = options.imgOptions.src;

  MovingObject.call(
    this, options.context, this.pos.x, this.pos.y, null,
    { height: 90, width: 40 }
  );
};

ObjectUtil.inherits(ChasingEnemy, MovingObject);

ChasingEnemy.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;


  this.sprite.height = this.imgOptions.height;
  this.sprite.width = this.imgOptions.width;
  this.sprite.numFrames = this.imgOptions.numFrames;

  // console.log(this.velocity.x);

  // if (this.facing === 'r') {
  //   if (this.velocity.x > 1) {
  //     this.sprite.sY = this.imgOptions.r.running.sY;
  //   } else {
  //     this.sprite.sY = this.imgOptions.r.standingStill.sY;
  //   }
  // } else if (this.facing === 'l') {
  //   if (this.velocity.x < -1) {
  //     this.sprite.sY = this.imgOptions.l.running.sY;
  //   } else {
  //     this.sprite.sY = this.imgOptions.l.standingStill.sY;
  //   }
  // }

  SpriteUtil.updateFrame(this);

  SpriteUtil.render({
    sprite: this.sprite,
    context: this.context,
    orientation: 'landscape',
    xPos: newX - this.width - 5,
    yPos: newY - this.sprite.height + this.height + 10,
    obj: this
  });

  // this.context.fillStyle = "pink";
  // this.context.beginPath();
  // this.context.fillRect(newX, newY, this.width, this.height);
};

ChasingEnemy.prototype.move = function (target) {
  if (this.activated) {
    this.targetX = target.pos.x - this.width - this.pos.x + target.width;
    if (this.targetX < -5) {
      this.sprite.sY = this.imgOptions.l.running.sY;
      this.pos.x -= this.speed;
      this.facing = 'l';
    } else if (this.targetX >= 5) {
      this.facing = 'r';
      this.sprite.sY = this.imgOptions.r.running.sY;
      this.pos.x += this.speed;
    } else {
      this.pos.x += 0;
      if (this.facing === 'r') {
        this.sprite.sY = this.imgOptions.r.standingStill.sY;
      } else if (this.facing === 'l') {
        this.sprite.sY = this.imgOptions.l.standingStill.sY;
      }
    }
  }
};

ChasingEnemy.prototype.collision = function (obj, dir) {
  if (dir) {
    this.game.endGame();
  }
};

module.exports = ChasingEnemy;
