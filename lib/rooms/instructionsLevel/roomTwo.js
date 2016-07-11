// notable events: cave in at left of room, locked door at bottom right
//   ladder, leading up to door to room 3.
// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomTwo = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 10,
    width: 10,
    playerJump: -10,
    playerStartX: 50,
    playerStartY: 900,
    doorCoords: doorCoords,
    img: ''
  });

  this.initiate();
};

ObjectUtil.inherits(RoomTwo, BasicRoom);

RoomTwo.prototype.initiate = function () {
  var worldContext = this;
  worldContext.game.endLevel(worldContext.game.context);

  // this._staticObjects.push(new this.Trigger({
  //   pos : { x : 50, y : this.height - 100 },
  //   context : this.game.context,
  //   width: 100,
  //   height: 100,
  //   activate: function () {
  //     if (this.notActivated) {
  //
  //       this.notActivated = false;
  //     }
  //   }
  // }));
};


module.exports = RoomTwo;
