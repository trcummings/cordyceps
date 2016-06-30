// notable events: cave in at left of room, locked door at bottom right
//   ladder, leading up to door to room 3.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomTwo = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 750,
    width: 2000,
    playerJump: -10,
    playerStartX: 1200,
    playerStartY: 670,
    doorCoords: doorCoords,
    img: 'lib/sprites/level1/room2/bg.png'
  });

  this.initiate();
};

ObjectUtil.inherits(RoomTwo, BasicRoom);

RoomTwo.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;


  // BOXES
  this._staticObjects.push(new this.Box({
    pos : { x : 0, y : 400 },
    context : this.game.context,
    width: 1340,
    height: 20,
    img: 'lib/sprites/nullpic.png'
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1320, y : 0 },
    context : this.game.context,
    width: 20,
    height: 400,
    img: 'lib/sprites/nullpic.png'
  }));

  // far right platform
  this._staticObjects.push(new this.Box({
    pos : { x : 1500, y : 250 },
    context : this.game.context,
    width: 500,
    height: 20
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1340, y : 250 },
    context : this.game.context,
    width: 90,
    height: 20
  }));

  // DOORS
  this._staticObjects.push(new this.Door({
    pos : { x : 100, y : this.height - 120 },
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

  this._staticObjects.push(new this.Trigger({
    pos : { x : 100, y : this.height - 120 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.height = 500;
        this.notActivated = false;
      }
    }
  }));


  this._staticObjects.push(new this.Door({
    pos : { x : 1890, y : 150 },
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

  this._staticObjects.push(new this.Trigger({
    pos : { x : 1890, y : 150 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.height = 500;
        this.notActivated = false;
      }
    }
  }));

  // LADDERS

  this._staticObjects.push(new this.Ladder({
    pos : { x : 1430, y : 250 },
    context : this.game.context,
    width: 70,
    height: 480,
    ladderId: 1
  }));


  this._staticObjects.push(new this.Door({
    pos : { x : 650, y : this.height - 120 },
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
    pos : { x : 1810, y : this.height - 120 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'lockedTwo',
      coords: { },
      locked: true
    }
  }));
  // Events

//   this._staticObjects.push(new this.Trigger({
//     pos : { x : 1200, y : this.height - 300 },
//     context : this.game.context,
//     width: 50,
//     height: 300,
//     activate: function () {
//       if (this.notActivated) {
//         worldContext.game.camera.screenShake();
//         worldContext.spawnCreepingShroom();
//         this.notActivated = false;
//       }
//     }
//   }));
};

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


module.exports = RoomTwo;
