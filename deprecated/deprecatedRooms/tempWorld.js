  var BasicRoom = require('./basicRoom');
  var Util = require('../util');

  var TempWorld = function (game, doorCoords) {
    BasicRoom.call(this, {
      game: game,
      height: 2000,
      width: 9000,
      playerJump: -20,
      playerX: 50,
      playerY: 1900,
      doorCoords: doorCoords
    });

    this.initiateBoxes();
    this.initiateTriggers();
    this.initiateRamps();
    this.initiateShrooms();
  };

  Util.inherits(TempWorld, BasicRoom);

  TempWorld.prototype.initiateBoxes = function () {
    for (var i = 0; i < 2000; i+=200) {
      this._allObjects.push(new this.Box({
        pos : { x : 300 + i, y : this.height - 70 - i},
        context : this.game.context,
        width: 300,
        height: 10,
      }));
    }
  };

  TempWorld.prototype.initiateTriggers = function () {
    var worldContext = this;

    this._allObjects.push(new this.Trigger({
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

    this._allObjects.push(new this.Trigger({
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

    this._allObjects.push(new this.Door({
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

    this._allObjects.push(new this.Door({
      pos : { x : 8870, y : this.height - 110 },
      context : this.game.context,
      width: 70,
      height: 100,
      activate: function () {
        worldContext.game.onDoor({
          door: 'eventHallway',
          coords: {
            x: 50,
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
    this._allObjects.push(new this.Ramp({
      pos : { x : 2000, y : this.height - 150 },
      context : this.game.context,
      width: 800,
      height: 140,
      slant: 'bl-tr'
    }));

    this._allObjects.push(new this.Ramp({
      pos : { x : 2400, y : this.height - 350 },
      context : this.game.context,
      width: 800,
      height: 400,
      slant: 'bl-tr'
    }));
  };

  TempWorld.prototype.initiateShrooms = function () {
    this._allObjects.push(new this.Shroom({
      pos : { x : 4000, y : this.height - 150 },
      context : this.game.context,
      width: 200,
      height: 200,
    }));
  };

  module.exports = TempWorld;
