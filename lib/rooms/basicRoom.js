var Box = require('../objects/box');
var Trigger = require('../objects/trigger');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');
var Shroom = require('../objects/shroom');
var TextOverlay = require('../objects/textOverlay');

var BasicRoom = function (options) {
  this.game = options.game;
  this.height = options.height;
  this.width = options.width;
  this.playerJump = options.playerJump;
  this._allObjects = [
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

BasicRoom.prototype.Box = Box;
BasicRoom.prototype.Trigger = Trigger;
BasicRoom.prototype.Ramp = Ramp;
BasicRoom.prototype.Door = Door;
BasicRoom.prototype.Shroom = Shroom;
BasicRoom.prototype.TextOverlay = TextOverlay;

module.exports = BasicRoom;
