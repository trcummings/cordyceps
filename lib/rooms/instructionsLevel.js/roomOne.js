// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 500,
    playerJump: -10,
    playerX: 30,
    playerY: 420,
    doorCoords: doorCoords,
    img: ''
  });

  this.initiate();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;

  this._staticObjects.push(new this.Door({
    pos : { x : 60, y : this.height - 115 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'roomTwo',
      coords: {
        x: path.fromRoomOne.toRoomTwo.x,
        y: path.fromRoomOne.toRoomTwo.y
      }
    }
  }));


};

module.exports = RoomOne;
