// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 1500,
    width: 1750,
    playerJump: -20,
    playerX: 50,
    playerY: 50,
    doorCoords: doorCoords
  });

  this.initiate();
  game.particlesOn = true;
  game.startCountdown();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;

  this._staticObjects.push(new this.Shroom({
    pos : { x : 50, y : this.height - 150 },
    img: 'lib/sprites/mushroom1.png',
    context : this.game.context,
    width: 200,
    height: 20,
  }));

  this._staticObjects.push(new this.Trigger({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: 350,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.followHigh();

        this.notActivated = false;
      }
    }
  }));

  this._staticObjects.push(new this.Trigger({
    pos : { x : 1310, y : this.height - 150 },
    context : this.game.context,
    width: 200,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        if (worldContext.game.countdownActive) {
          worldContext.game.stopCountdown();
        }
      }
    }
  }));

  this._staticObjects.push(new this.Trigger({
    pos : { x : 1290, y : this.height - 180 },
    context : this.game.context,
    width: 20,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        if (!worldContext.game.countdownActive) {
          worldContext.game.startCountdown();
        }
      }
    }
  }));

  this._staticObjects.push(new this.StaticObject({
    pos : { x : 1320, y : this.height - 180 },
    context : this.game.context,
    width: 390,
    height: 215
  }));

  worldContext.game.topRenders.push(new this.Decorative({
    pos : { x : 1310, y : this.height - 200 },
    context : this.game.context,
    width: 70,
    height: 150,
    img: 'lib/sprites/antifungalchamber.png'
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1320, y : this.height - 180 },
    context : this.game.context,
    width: 390,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1690, y : this.height - 180 },
    context : this.game.context,
    width: 20,
    height: 215,
  }));

  // var path = this.PathUtil.inLevelTwo;

  // DOORS
  // this._staticObjects.push(new this.Door({
  //   pos : { x : 50, y : this.height - 110 },
  //   context : this.game.context,
  //   width: 70,
  //   height: 100,
  //   doorPath: {
  //     door: 'roomTwo',
  //     coords: {
  //       x: path.fromRoomOne.toRoomTwo.x,
  //       y: path.fromRoomOne.toRoomTwo.y
  //     }
  //   }
  // }));
};

module.exports = RoomOne;
