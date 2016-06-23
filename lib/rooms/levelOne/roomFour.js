// notable events: locked door at end of room, when player tries door, enemy
//  walks in, collapses, and after ten or so seconds, bursts, creating a
//  shower of pollen, start transition, end level 1.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');
var CutsceneUtil = require('../../util/cutsceneUtil');

var RoomFour = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 750,
    playerJump: -10,
    playerX: 620,
    playerY: 420,
    doorCoords: doorCoords
  });

  this.initiate();
};

ObjectUtil.inherits(RoomFour, BasicRoom);

RoomFour.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;

  this._staticObjects.push(new this.Trigger({
    pos : { x : 650, y : this.height - 50 },
    context : this.game.context,
    width: 100,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        worldContext.CutsceneUtil.levelOneRoomFourScene({
          callback1: function (height) {
            worldContext.game.camera.followHigh();
            worldContext.game.camera.startHallwaySquash(height);
          },
          callback2: function () {
            worldContext.game.endLevel(worldContext.game.context);
          },
          worldContext: worldContext,
          chasingEnemy: worldContext.ChasingEnemy
        });
        this.notActivated = false;
      }
    }
  }));

  // DOORS
  this._staticObjects.push(new this.Door({
    pos : { x : 650, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'lockedTwo',
      coords: { },
      locked: true
    }
  }));

  this._staticObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'lockedOne',
      coords: { },
      locked: true
    }
  }));

  // RoomTwo.prototype.spawnCreepingShroom = function () {
  //   var shroom = new this.CreepingShroom({
  //     pos : { x : 50, y : this.height - 180 },
  //     context : this.game.context,
  //     height: 130,
  //     width: 50,
  //     growsToward: 'right'
  //   });
  //
  //   this.game._movingObjects.push(shroom);
  //   this._movingObjects.push(shroom);
  // };
};

module.exports = RoomFour;
