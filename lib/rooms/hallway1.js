var Box = require('../objects/box');
var Trigger = require('../objects/trigger');
// var Player = require('../player.js');
// var Camera = require('../camera.js');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');

var HallwayOne = function (game, doorCoords) {
  this.game = game;
  this.height = 500;
  this.width = 3000;

  if (doorCoords) {
    this.playerStart = {
      x: doorCoords.x,
      y: doorCoords.y
    };
  } else {
    this.playerStart = {
      x: 50,
      y: 450
    };
  }

  // this.connectedRooms = {
  //   tempWorld: 'tempWorld',
  //   enemyRoom: 'enemyRoom'
  // };

  this.playerJump = -10;

  this._allObjects = [];

  this.initiateBoxes();
  this.initiateTriggers();
  this.initiateRamps();
  this.initiateShrooms();
};

HallwayOne.prototype.initiateBoxes = function () {
  // left box
  this._allObjects.push(new Box({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: 40,
    height: this.height
  }));

  // right box
  this._allObjects.push(new Box({
    pos : { x : this.width - 10, y : 0 },
    context : this.game.context,
    width: 50,
    height: 6 * this.height
  }));

  // top box
  this._allObjects.push(new Box({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: this.width,
    height: 40,
  }));

  // bottom box
  this._allObjects.push(new Box({
    pos : { x : 0, y : this.height - 10 },
    context : this.game.context,
    width: this.width,
    height: 40,
  }));
};

HallwayOne.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new Door({
    pos : { x : 2800, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'tempWorld',
        coords: {
          x: 50,
          y: 1900
        }
      });
    }
  }));

  this._allObjects.push(new Door({
    pos : { x : 1400, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'enemyRoom',
        coords: {
          x: 50,
          y: 390
        }
      });
    }
  }));
};

HallwayOne.prototype.initiateRamps = function () {
};

HallwayOne.prototype.initiateShrooms = function () {
};

module.exports = HallwayOne;
