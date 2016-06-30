// notable events:
//  enemy midway through room, when player gets to a certain distance,
//   he charges the player.
//  ladder midway through room to get around enemy. When player lands on
//   pile of tables, the tables crush the enemy
//  door to room 4
var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');
var SpriteUtil = require('../../util/spriteUtil.js');


var RoomThree = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 550,
    width: 3000,
    playerJump: -10,
    playerStartX: 50,
    playerStartY: 470,
    doorCoords: doorCoords,
    img: 'lib/sprites/level1/room3/bg.png'
  });

  this.initiate();
};

ObjectUtil.inherits(RoomThree, BasicRoom);

RoomThree.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inLevelOne;

  // BOXES

  this._staticObjects.push(new this.Box({
    pos : { x : 1500, y : 150 },
    context : this.game.context,
    width: 320,
    height: 20,
    img: 'lib/sprites/nullpic.png'
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 0, y : this.height - 20 },
    context : this.game.context,
    width: 3000,
    height: 20,
    img: 'lib/sprites/nullpic.png'
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 1800, y : 180 },
    context : this.game.context,
    width: 200,
    height: 20,
    img: 'lib/sprites/nullpic.png'
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 300, y : 150 },
    context : this.game.context,
    width: 500,
    height: 20,
    img: 'lib/sprites/nullpic.png'
  }));

  worldContext.game.topRenders.push(new this.Decorative({
    pos : { x : 1435, y : 15 },
    context : this.game.context,
    width: 600,
    height: 160,
    img: 'lib/sprites/level1/room3/rafter2.png',
    animated: false,
    activated: false,
    sprite: {
      frameIdx: 0,
      numFrames: 1,
      height: 600,
      width: 160
    },
    decorativeId: 2,
    orientation: 'landscape'
  }));

  worldContext.game.topRenders.push(new this.Decorative({
    pos : { x : 225, y : 15 },
    context : this.game.context,
    width: 600,
    height: 160,
    img: 'lib/sprites/level1/room3/rafter1.png',
    animated: false,
    activated: false,
    sprite: {
      frameIdx: 0,
      numFrames: 1,
      height: 600,
      width: 160
    },
    decorativeId: 2,
    orientation: 'landscape'
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
    height: 300,
    ladderId: 1
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
    pos : { x : 50, y : this.height - 130 },
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
    pos : { x : 2850, y : this.height - 130 },
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

  // Triggers
  // Activate enemy
  this._staticObjects.push(new this.Trigger({
    pos : { x : 1000, y : this.height - 100 },
    context : this.game.context,
    width: 50,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
        enemy.obj.activated = true;
        worldContext.game.cameraTarget = enemy.obj;
        worldContext.game.camera.startHallwaySquash(500);
        worldContext.game.camera.screenShake();

        var ladder = worldContext.modifyObject('staticObject', 'ladderId', 2);
        worldContext.game._staticObjects[ladder.index].height = 330;

        this.notActivated = false;
      }
    }
  }));

  // once player is up ladder, follow player again
  this._staticObjects.push(new this.Trigger({
    pos : { x : 230, y : 200 },
    context : this.game.context,
    width: 100,
    height: 200,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.cameraTarget = worldContext.game.player;
        worldContext.game.camera.endHallwaySquash();
        worldContext.game.camera.startHallwayWiden(550);
        this.notActivated = false;
      }
    }
  }));


// kill enemy
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
          worldContext.game.cameraTarget = worldContext.game.player;
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
    pos : { x : 1500, y : 440 },
    context : this.game.context,
    game: this.game,
    width: 100,
    height: 100,
    activated: false,
    triggerId: 1,
    imgOptions: SpriteUtil.levelOneRoomThreeEnemy.upright
  }));
};

module.exports = RoomThree;
