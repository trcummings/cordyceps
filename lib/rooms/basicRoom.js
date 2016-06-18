var Box = require('../objects/box');
var Trigger = require('../objects/trigger');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');
var Shroom = require('../objects/shroom');
var CreepingShroom = require('../objects/creepingShroom');
var ChasingEnemy = require('../objects/chasingEnemy');
var Ladder = require('../objects/ladder');
var TextOverlay = require('../objects/textOverlay');

var BasicRoom = function (options) {
  this.game = options.game;
  this.height = options.height;
  this.width = options.width;
  this.playerJump = options.playerJump;
  this.playerStart = {
    x: options.playerX,
    y: options.playerY
  };
  this._staticObjects = [
    new Box({
      pos : { x : 0, y : 0 },
      context : this.game.context,
      width: 40,
      height: this.height
    }),

    // right box
    new Box({
      pos : { x : this.width - 10, y : 0 },
      context : this.game.context,
      width: 50,
      height: 6 * this.height
    }),

    // top box
    new Box({
      pos : { x : 0, y : 0 },
      context : this.game.context,
      width: this.width,
      height: 40,
    }),

    // bottom box
    new Box({
      pos : { x : 0, y : this.height - 10 },
      context : this.game.context,
      width: this.width,
      height: 40,
    })
  ];

  this._movingObjects = [];

  this.setPlayerLocation(options);
};

BasicRoom.prototype.setPlayerLocation = function (options) {
  if (options.doorCoords) {
    this.playerStart = {
      x: options.doorCoords.x,
      y: options.doorCoords.y
    };
  } else {
    this.playerStart = {
      x: options.playerX,
      y: options.playerY
    };
  }
};

BasicRoom.prototype.activateEnemy = function (triggerId) {
  this.game._movingObjects.forEach(function (obj, index) {
    if (obj.triggerId && obj.triggerId === triggerId) {
      obj.activated = true;
    }
  });
};

BasicRoom.prototype.killEnemy = function (triggerId) {
  this.game._movingObjects.forEach(function (obj, index) {
    if (obj.triggerId && obj.triggerId === triggerId) {
      this.game._movingObjects.splice(index, 1);
    }
  }.bind(this));
};

BasicRoom.prototype.Box = Box;
BasicRoom.prototype.Trigger = Trigger;
BasicRoom.prototype.Ramp = Ramp;
BasicRoom.prototype.Door = Door;
BasicRoom.prototype.Shroom = Shroom;
BasicRoom.prototype.CreepingShroom = CreepingShroom;
BasicRoom.prototype.ChasingEnemy = ChasingEnemy;
BasicRoom.prototype.TextOverlay = TextOverlay;
BasicRoom.prototype.Ladder = Ladder;

module.exports = BasicRoom;
