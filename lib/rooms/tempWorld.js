var Box = require('../objects/box');
var Trigger = require('../objects/trigger');
var Shroom = require('../objects/shroom');
// var Player = require('../player.js');
// var Camera = require('../camera.js');
var TextOverlay = require('../objects/textOverlay');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');

var TempWorld = function (game, doorCoords) {
  this.game = game;
  this.height = 2000;
  this.width = 9000;

  if (doorCoords) {
    this.playerStart = {
      x: doorCoords.x,
      y: doorCoords.y
    };
  } else {
    this.playerStart = {
      x: 50,
      y: 1900
    };
  }

  this.connectedRooms = {
    hallway1: 'hallway1'
  };

  this.playerJump = -20;

  this._allObjects = [];

  this.initiateBoxes();
  this.initiateTriggers();
  this.initiateRamps();
  this.initiateShrooms();
};

TempWorld.prototype.initiateBoxes = function () {
  // left box
  this._allObjects.push(new Box({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: 40,
    height: this.height
  }));

  // right box
  this._allObjects.push(new Box({
    pos : { x : this.width - 10, y : 0 },
    context : this.game.context,
    width: 50,
    height: 6 * this.height
  }));

  // top box
  this._allObjects.push(new Box({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: this.width,
    height: 40,
  }));

  // bottom box
  this._allObjects.push(new Box({
    pos : { x : 0, y : this.height - 10 },
    context : this.game.context,
    width: this.width,
    height: 40,
  }));

  // 1st platform
  this._allObjects.push(new Box({
    pos : { x : 300, y : this.height - 70 },
    context : this.game.context,
    width: 300,
    height: 10,
  }));

  for (var i = 0; i < 2000; i+=200) {
    this._allObjects.push(new Box({
      pos : { x : 300 + i, y : this.height - 70 - i},
      context : this.game.context,
      width: 300,
      height: 10,
    }));
  }
};

TempWorld.prototype.initiateTriggers = function () {
  var worldContext = this;

  this._allObjects.push(new Trigger({
    pos : { x : 800, y : this.height - 70 },
    context : this.game.context,
    width: 50,
    height: 50,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.startCountdown();
        worldContext.game.countdownActive = true;
        this.notActivated = false;
      }
    }
  }));

  this._allObjects.push(new Trigger({
    pos : { x : 8800, y : this.height - 70 },
    context : this.game.context,
    width: 50,
    height: 50,
    activate: function () {
      if (this.notActivated) {
        worldContext.game.stopCountdown();
        console.log('you win, motherfuckers');
        this.notActivated = false;
      }
    }
  }));

  this._allObjects.push(new Door({
    pos : { x : this.playerStart.x, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      worldContext.game.onDoor({
        door: 'hallway1',
        coords: {
          x: 2800,
          y: 390
        }
      });
    }
  }));

  // this._allObjects.push(new Trigger({
  //   pos : { x : 1200, y : this.height - 70 },
  //   context : this.game.context,
  //   width: 50,
  //   height: 50,
  //   activate: function () {
  //     worldContext.textOverlays.push(
  //       new TextOverlay({
  //         message: "aye bruh",
  //         fontSize: 24,
  //       })
  //     );
  //   }
  // }));
  //
  // this._allObjects.push(new Trigger({
  //   pos : { x : 1700, y : this.height - 70 },
  //   context : this.game.context,
  //   width: 50,
  //   height: 50,
  //   activate: function () {
  //     worldContext.textOverlays.push(
  //       new TextOverlay({
  //         message: "honkey tonk",
  //         fontSize: 24,
  //       })
  //     );
  //   }
  // }));
  //
  // this._allObjects.push(new Trigger({
  //   pos : { x : 1300, y : this.height - 1070 },
  //   context : this.game.context,
  //   width: 50,
  //   height: 50,
  //   activate: function () {
  //     worldContext.textOverlays.push(
  //       new TextOverlay({
  //         message: "hey tony whered you \ get that fresh peperoney",
  //         fontSize: 24,
  //       })
  //     );
  //   }
  // }));
};

TempWorld.prototype.initiateRamps = function () {
  this._allObjects.push(new Ramp({
    pos : { x : 2000, y : this.height - 150 },
    context : this.game.context,
    width: 800,
    height: 140,
    slant: 'bl-tr'
  }));

  this._allObjects.push(new Ramp({
    pos : { x : 2400, y : this.height - 350 },
    context : this.game.context,
    width: 800,
    height: 400,
    slant: 'bl-tr'
  }));
};

TempWorld.prototype.initiateShrooms = function () {
  this._allObjects.push(new Shroom({
    pos : { x : 4000, y : this.height - 150 },
    context : this.game.context,
    width: 200,
    height: 200,
  }));
};

module.exports = TempWorld;
