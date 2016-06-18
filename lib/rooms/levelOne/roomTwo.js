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
    width: 3000,
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

  // DOORS
  this._allObjects.push(new this.Door({
    pos : { x : 1200, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'roomOne',
        coords: {
          x: path.fromRoomTwo.toRoomOne.x,
          y: path.fromRoomTwo.toRoomOne.y
        }
      });
    }
  }));
};

module.exports = RoomTwo;
