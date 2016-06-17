var BasicRoom = require('./basicRoom');
var Util = require('../util');

var HallwayOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 3000,
    playerJump: -10,
    playerX: 50,
    playerY: 450,
    doorCoords: doorCoords
  });

  this.initiateTriggers();
};

Util.inherits(HallwayOne, BasicRoom);

HallwayOne.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new this.Door({
    pos : { x : 2800, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'tempWorld',
        coords: {
          x: 50,
          y: 1900
        }
      });
    }
  }));

  this._allObjects.push(new this.Door({
    pos : { x : 1400, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'enemyRoom',
        coords: {
          x: 50,
          y: 390
        }
      });
    }
  }));
};

module.exports = HallwayOne;
