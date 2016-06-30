var Box = require('../objects/box');
var StaticObject = require('../objects/staticObject');
var Trigger = require('../objects/trigger');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');
var Shroom = require('../objects/shroom');
var CreepingShroom = require('../objects/creepingShroom');
var ChasingEnemy = require('../objects/chasingEnemy');
var Ladder = require('../objects/ladder');
var TextOverlay = require('../objects/textOverlay');
var Decorative = require('../objects/decorative');
var PathUtil = require('../util/pathUtil');
var CutsceneUtil = require('../util/cutsceneUtil');


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
    //bg
    new Decorative({
      pos : { x : 0, y : 0 },
      context : this.game.context,
      img: options.img,
      animated: false,
      height: this.height,
      width: this.width
    }),

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
    // new Box({
    //   pos : { x : 0, y : 0 },
    //   context : this.game.context,
    //   width: this.width,
    //   height: 40,
    // }),

    // bottom box
    new Box({
      pos : { x : 0, y : this.height - 10 },
      context : this.game.context,
      width: this.width,
      height: 40,
      boxId: 'bottom'
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

BasicRoom.prototype.modifyObject = function (type, idType, idValue) {
  var game = this.game;
  var types = {
    movingObject: game._movingObjects,
    staticObject: game._staticObjects
  };

  var returnVal = null;
  types[type].forEach(function (obj, index) {
    if (obj[idType] && obj[idType] === idValue) {
      returnVal = {
        obj: obj,
        type: types[type],
        index: index
      };
    }
  });

  return returnVal;
};

BasicRoom.prototype.StaticObject = StaticObject;
BasicRoom.prototype.Box = Box;
BasicRoom.prototype.Trigger = Trigger;
BasicRoom.prototype.Ramp = Ramp;
BasicRoom.prototype.Door = Door;
BasicRoom.prototype.Shroom = Shroom;
BasicRoom.prototype.CreepingShroom = CreepingShroom;
BasicRoom.prototype.ChasingEnemy = ChasingEnemy;
BasicRoom.prototype.TextOverlay = TextOverlay;
BasicRoom.prototype.Ladder = Ladder;
BasicRoom.prototype.Decorative = Decorative;
BasicRoom.prototype.PathUtil = PathUtil;
BasicRoom.prototype.CutsceneUtil = CutsceneUtil;

module.exports = BasicRoom;
