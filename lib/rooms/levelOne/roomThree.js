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
    playerStartY: 470,
    doorCoords: doorCoords
  });

  this.initiate();
};

Util.inherits(RoomThree, BasicRoom);

RoomThree.prototype.initiate = function () {
  var worldContext = this;

  // BOXES

  this._staticObjects.push(new this.Box({
    pos : { x : 1500, y : 150 },
    context : this.game.context,
    width: 500,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 300, y : 150 },
    context : this.game.context,
    width: 700,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 900, y : 310 },
    context : this.game.context,
    width: 300,
    height: 20,
  }));

  // Ladders
  this._staticObjects.push(new this.Ladder({
    pos : { x : 1430, y : 150 },
    context : this.game.context,
    width: 70,
    height: 310,
    ladderId: 1
  }));

  this._staticObjects.push(new this.Ladder({
    pos : { x : 270, y : 150 },
    context : this.game.context,
    width: 70,
    height: 150,
    ladderId: 2
  }));

  // DOORS
  this._staticObjects.push(new this.Door({
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

  this._staticObjects.push(new this.Door({
    pos : { x : 2850, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'roomFour',
      coords: {
        x: path.fromRoomThree.toRoomFour.x,
        y: path.fromRoomThree.toRoomFour.y
      }
    }
  }));

  // Ramps
  this._staticObjects.push(new this.Ramp({
    pos : { x : 2100, y : 170 },
    context : this.game.context,
    width: 200,
    height: 380,
    slant: 'tl-br'
  }));

  // Triggers
  this._staticObjects.push(new this.Trigger({
    pos : { x : 1000, y : this.height - 100 },
    context : this.game.context,
    width: 50,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
        enemy.obj.activated = true;

        var ladder = worldContext.modifyObject('staticObject', 'ladderId', 2);
        worldContext.game._staticObjects[ladder.index].height = 350;

        this.notActivated = false;
      }
    }
  }));

  this._staticObjects.push(new this.Trigger({
    pos : { x : 2300, y : this.height - 100 },
    context : this.game.context,
    width: 50,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
        worldContext.game._movingObjects.splice(enemy.index, 1);
        this.notActivated = false;
      }
    }
  }));

  // Enemies
  this._movingObjects.push(new this.ChasingEnemy({
    pos : { x : 1500, y : 450 },
    context : this.game.context,
    width: 100,
    height: 100,
    activated: false,
    triggerId: 1
  }));
};

module.exports = RoomThree;
