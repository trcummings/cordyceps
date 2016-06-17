var BasicRoom = require('./basicRoom');
var Util = require('../util');

var EnemyRoom = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 750,
    playerJump: -10,
    playerX: 50,
    playerY: 450,
    doorCoords: doorCoords
  });

  this.initiateTriggers();
};

Util.inherits(EnemyRoom, BasicRoom);

EnemyRoom.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'hallway1',
        coords: {
          x: 1400,
          y: 390
        }
      });
    }
  }));
};

module.exports = EnemyRoom;
