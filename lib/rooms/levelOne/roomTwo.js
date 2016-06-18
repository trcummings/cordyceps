// notable events: cave in at left of room, locked door at bottom right
//   ladder, leading up to door to room 3.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var Util = require('../../util');
var PathUtil = require('../pathUtil');
var path = PathUtil.inLevelOne;

var RoomTwo = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 750,
    width: 5000,
    playerJump: -10,
    playerStartX: 1200,
    playerStartY: 720,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomTwo, BasicRoom);

RoomTwo.prototype.initiate = function () {
  var worldContext = this;

  // BOXES

  // far right platform
  this._allObjects.push(new this.Box({
    pos : { x : 4500, y : 250 },
    context : this.game.context,
    width: 500,
    height: 20,
  }));

  // DOORS
  this._allObjects.push(new this.Door({
    pos : { x : 3200, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'roomOne',
      coords: {
        x: path.fromRoomTwo.toRoomOne.x,
        y: path.fromRoomTwo.toRoomOne.y
      }
    }
  }));

  this._allObjects.push(new this.Door({
    pos : { x : 4920, y : 150 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'roomThree',
      coords: {
        x: path.fromRoomTwo.toRoomThree.x,
        y: path.fromRoomTwo.toRoomThree.y
      }
    }
  }));

  // LADDERS

  this._allObjects.push(new this.Ladder({
    pos : { x : 4430, y : 250 },
    context : this.game.context,
    width: 70,
    height: 490
  }));


  // Events

  this._allObjects.push(new this.Trigger({
    pos : { x : 1200, y : this.height - 300 },
    context : this.game.context,
    width: 50,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.screenShake();
        worldContext.spawnCreepingShroom();
        this.notActivated = false;
      }
    }
  }));

};

RoomTwo.prototype.spawnCreepingShroom = function () {
  this._allObjects.push(new this.CreepingShroom({
    pos : { x : 50, y : this.height - 30 },
    context : this.game.context,
    height: 300,
    width: 50,
    growsToward: 'right'
  }));
};


module.exports = RoomTwo;
