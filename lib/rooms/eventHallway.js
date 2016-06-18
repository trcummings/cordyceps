var BasicRoom = require('./basicRoom');
var Util = require('../util');

var EventHallway = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 5000,
    playerJump: -10,
    playerX: 50,
    playerY: 450,
    doorCoords: doorCoords
  });

  this.initiateTriggers();
};

Util.inherits(EventHallway, BasicRoom);

EventHallway.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new this.Trigger({
    pos : { x : 100, y : this.height - 70 },
    context : this.game.context,
    width: 50,
    height: 50,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.startHallwaySquash(worldContext.game.player);
      }
    }
  }));

  this._allObjects.push(new this.Trigger({
    pos : { x : 4000, y : this.height - 70 },
    context : this.game.context,
    width: 50,
    height: 50,
    activate: function () {
      worldContext.game.switchRooms(
        worldContext.game.context,
        { door: 'crazyRoom' }
      );
      worldContext.game.player.grounded = false;
    }
  }));

  this._allObjects.push(new this.Door({
    pos : { x : 50, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'tempWorld',
        coords: {
          x: 8870,
          y: 1900
        }
      });
    }
  }));
};

module.exports = EventHallway;
