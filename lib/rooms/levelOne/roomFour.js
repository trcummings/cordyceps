// notable events: locked door at end of room, when player tries door, enemy
//  walks in, collapses, and after ten or so seconds, bursts, creating a
//  shower of pollen, start transition, end level 1.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var Util = require('../../util');
var PathUtil = require('../pathUtil');
var path = PathUtil.inLevelOne;

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

Util.inherits(RoomFour, BasicRoom);

RoomFour.prototype.initiate = function () {
  var worldContext = this;

  // DOORS
  // this._staticObjects.push(new this.Door({
  //   pos : { x : 50, y : this.height - 110 },
  //   context : this.game.context,
  //   width: 70,
  //   height: 100,
  //   doorPath: {
  //     door: 'roomTwo',
  //     coords: {
  //       x: path.fromRoomFour.toRoomTwo.x,
  //       y: path.fromRoomFour.toRoomTwo.y
  //     }
  //   }
  // }));
};

module.exports = RoomFour;
