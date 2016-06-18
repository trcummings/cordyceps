// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var Util = require('../../util');
var PathUtil = require('../pathUtil');
var path = PathUtil.inLevelOne;

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 750,
    playerJump: -10,
    playerX: 620,
    playerY: 470,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;

  // DOORS
  this._allObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'roomTwo',
        coords: {
          x: path.fromRoomOne.toRoomTwo.x,
          y: path.fromRoomOne.toRoomTwo.y
        }
      });
    }
  }));
};

module.exports = RoomOne;
