var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 1000,
    playerJump: -10,
    playerX: 30,
    playerY: 420,
    doorCoords: doorCoords,
    img: ''
  });

  this.initiate();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inInstructionsLevel;

  this._staticObjects.push(new this.Door({
    pos : { x : 900, y : this.height - 350 },
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

  this._staticObjects.push(new this.Door({
    pos : { x : 900, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'lockedTwo',
      coords: { },
      locked: true
    }
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 200, y : this.height - 50 },
    context : this.game.context,
    width: 200,
    height: 50
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 700, y : this.height - 250 },
    context : this.game.context,
    width: 300,
    height: 20
  }));

  this._staticObjects.push(new this.Ladder({
    pos : { x : 630, y : this.height - 250 },
    context : this.game.context,
    width: 70,
    height: 200,
    ladderId: 1
  }));

};

module.exports = RoomOne;
