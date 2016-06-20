// notable events:
//  enemy midway through room, when player gets to a certain distance,
//   he charges the player.
//  ladder midway through room to get around enemy. When player lands on
//   pile of tables, the tables crush the enemy
//  door to room 4
var BasicRoom = require('../basicRoom');
var Util = require('../../util');

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
  var path = this.PathUtil.inLevelOne;

  // BOXES

  this._staticObjects.push(new this.Box({
    pos : { x : 1500, y : 150 },
    context : this.game.context,
    width: 350,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1800, y : 180 },
    context : this.game.context,
    width: 200,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 300, y : 150 },
    context : this.game.context,
    width: 500,
    height: 20,
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 900, y : 310 },
    context : this.game.context,
    img: 'lib/sprites/forkliftroom3.png',
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

  this._staticObjects.push(new this.Decorative({
    pos : { x : 230, y : 150 },
    context : this.game.context,
    width: 70,
    height: 150,
    img: 'lib/sprites/foldedladderroom3.png'
  }));

  this._staticObjects.push(new this.Ladder({
    pos : { x : 230, y : 150 },
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
    pos : { x : 2050, y : 210 },
    context : this.game.context,
    width: 290,
    height: 330,
    slant: 'tl-br'
  }));

  this._staticObjects.push(new this.Decorative({
    pos : { x : 1830, y : 210 },
    context : this.game.context,
    width: 530,
    height: 320,
    img: 'lib/sprites/trashfallingroom3.png',
    animated: true,
    activated: false,
    sprite: {
      frameIdx: 0,
      numFrames: 4,
      height: 1325,
      width: 530
    },
    decorativeId: 1,
    orientation: 'landscape'
  }));



  /// how to give this shit an animated picture?

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
    pos : { x : 2100, y : this.height - 300 },
    context : this.game.context,
    width: 350,
    height: 300,
    activate: function () {
      if (this.notActivated) {
        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
        enemy.obj.activated = false;

        window.setTimeout(function () {
          worldContext.game._movingObjects.splice(enemy.index, 1);
        }, 200);

        worldContext.game.camera.screenShake();

        var deco = worldContext.modifyObject('staticObject', 'decorativeId', 1);
        deco.obj.activated = true;


        this.notActivated = false;
      }
    }
  }));

  // Enemies
  this._movingObjects.push(new this.ChasingEnemy({
    pos : { x : 1500, y : 450 },
    context : this.game.context,
    game: this.game,
    width: 100,
    height: 100,
    activated: false,
    triggerId: 1
  }));
};

module.exports = RoomThree;
