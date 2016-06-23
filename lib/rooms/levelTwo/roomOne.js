// starting room in game
// notable events: player cannot move until 'instructions' are over
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 1500,
    width: 1750,
    playerJump: -20,
    playerX: 50,
    playerY: 50,
    doorCoords: doorCoords
  });

  this.initiate();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;

  this._staticObjects.push(new this.Shroom({
    pos : { x : 70, y : this.height - 150 },
    img: 'lib/sprites/mushroom1.png',
    context : this.game.context,
    width: 200,
    height: 200,
  }));

  this._staticObjects.push(new this.Trigger({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: 350,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.camera.followHigh();

        this.notActivated = false;
      }
    }
  }));

  // var path = this.PathUtil.inLevelTwo;

  // DOORS
  // this._staticObjects.push(new this.Door({
  //   pos : { x : 50, y : this.height - 110 },
  //   context : this.game.context,
  //   width: 70,
  //   height: 100,
  //   doorPath: {
  //     door: 'roomTwo',
  //     coords: {
  //       x: path.fromRoomOne.toRoomTwo.x,
  //       y: path.fromRoomOne.toRoomTwo.y
  //     }
  //   }
  // }));
};

module.exports = RoomOne;
