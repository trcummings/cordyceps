// notable events: cave in at left of room, locked door at bottom right
//   ladder, leading up to door to room 3.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var Util = require('../../util');

var RoomTwo = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 750,
    width: 2000,
    playerJump: -10,
    playerStartX: 1200,
    playerStartY: 670,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomTwo, BasicRoom);

RoomTwo.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;


  // BOXES

  // far right platform
  this._staticObjects.push(new this.Box({
    pos : { x : 1500, y : 250 },
    context : this.game.context,
    width: 500,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1330, y : 250 },
    context : this.game.context,
    width: 100,
    height: 20,
  }));

  // DOORS
  this._staticObjects.push(new this.Door({
    pos : { x : 100, y : this.height - 110 },
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

  this._staticObjects.push(new this.Door({
    pos : { x : 1920, y : 150 },
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

  this._staticObjects.push(new this.Ladder({
    pos : { x : 1430, y : 250 },
    context : this.game.context,
    width: 70,
    height: 490,
    ladderId: 1
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
