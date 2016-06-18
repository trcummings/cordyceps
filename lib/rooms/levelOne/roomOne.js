// starting room in game
// notable events: player cannot move until 'instructions' are over

var BasicRoom = require('../basicRoom');
var Util = require('../../util');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 750,
    playerJump: -10,
    playerX: 650,
    playerY: 30,
    doorCoords: doorCoords
  });

  this.initiateTriggers();
};

Util.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'roomTwo',
        coords: {
          x: 1400,
          y: 390
        }
      });
    }
  }));
};

module.exports = RoomOne;
