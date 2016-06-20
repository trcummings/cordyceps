// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var Util = require('../../util');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 1500,
    width: 1750,
    playerJump: -20,
    playerX: 50,
    playerY: 1470,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;
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
