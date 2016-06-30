// notable events: cave in at left of room, locked door at bottom right
//   ladder, leading up to door to room 3.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomTwo = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 1000,
    width: 1000,
    playerJump: -10,
    playerStartX: 50,
    playerStartY: 950,
    doorCoords: doorCoords,
    img: ''
  });

  this.initiate();
};

ObjectUtil.inherits(RoomTwo, BasicRoom);

RoomTwo.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;

};


module.exports = RoomTwo;
