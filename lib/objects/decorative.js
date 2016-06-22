var ObjectUtil = require('../util/objectUtil.js');
var StaticObject = require('./staticObject');

var Decorative = function (options) {
  this.context = options.context;
  this.image = new Image();
  this.image.src = options.img;
  this.sprite = options.sprite;
  this.activated = options.activated;
  this.animated = options.animated;
  this.decorativeId = options.decorativeId;
  this.orientation = options.orientation;

  StaticObject.call(this, options);
};

ObjectUtil.inherits(Decorative, StaticObject);

Decorative.prototype.render = function (camera) {
  var newX = this.pos.x - camera.cpos.x;
  var newY = this.pos.y - camera.cpos.y;

  if (this.animated) {
    if(!this.interval) {
      this.interval = window.setInterval(function () {
        if (this.activated) {
          if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
            this.sprite.frameIdx = 3;
          } else {
            this.sprite.frameIdx++;
          }
        } else {
          this.sprite.frameIdx = 0;
        }
      }.bind(this), 150);
    }

    if (this.orientation === 'portrait') {
      this.context.drawImage(
        this.image,
        this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
        0,
        this.sprite.width / this.sprite.numFrames,
        this.sprite.height,
        newX - this.width - 5,
        newY - this.sprite.height + this.height + 10,
        this.sprite.width / this.sprite.numFrames,
        this.sprite.height
      );
    } else if (this.orientation === 'landscape') {
      this.context.drawImage(
        this.image,
        0,
        this.sprite.frameIdx * this.sprite.height / this.sprite.numFrames,
        this.sprite.width,
        this.sprite.height / this.sprite.numFrames,
        newX + 10,
        newY - 5,
        this.sprite.width,
        this.sprite.height / this.sprite.numFrames
      );
    }
  } else {
    this.context.drawImage(this.image, newX - 10, newY - 10);
  }

};

Decorative.prototype.collision = function () {

};

module.exports = Decorative;
