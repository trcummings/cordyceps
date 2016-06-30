// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 750,
    playerJump: -10,
    playerX: 620,
    playerY: 420,
    doorCoords: doorCoords,
    img: 'lib/sprites/level1/room1/bg.png',
    sprite: {
      height: 500,
      width: 750
    }
  });

  this.initiate();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;

  // DOORS
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

  this._staticObjects.push(new this.Trigger({
    pos : { x : 620, y : this.height - 100 },
    context : this.game.context,
    width: 200,
    height: 100,
    eventId: 1,
    activate: function () {
      if (this.notActivated && worldContext.game.eventIds.indexOf(this.eventId) === -1) {
        var ctxt = worldContext.game;
        worldContext.game.eventIds.push(this.eventId);
        worldContext.CutsceneUtil.levelOneRoomOneScene(ctxt);
        this.notActivated = false;
      }
    }
  }));
};

module.exports = RoomOne;
