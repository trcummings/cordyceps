// notable events:
//  enemy midway through room, when player gets to a certain distance,
//   he charges the player.
//  ladder midway through room to get around enemy. When player lands on
//   pile of tables, the tables crush the enemy
//  door to room 4
var BasicRoom = require('../basicRoom');
var Util = require('../../util');
var PathUtil = require('../pathUtil');
var path = PathUtil.inLevelOne;

var RoomThree = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 550,
    width: 3000,
    playerJump: -10,
    playerStartX: 50,
    playerStartY: 520,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomThree, BasicRoom);

RoomThree.prototype.initiate = function () {
  var worldContext = this;

  // DOORS
  this._allObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'roomTwo',
      coords: {
        x: path.fromRoomThree.toRoomTwo.x,
        y: path.fromRoomThree.toRoomTwo.y
      }
    }
  }));
};

module.exports = RoomThree;
