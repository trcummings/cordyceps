var BasicRoom = require('./basicRoom');
var Util = require('../util');

var CrazyRoom = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 7000,
    width: 3000,
    playerJump: -20,
    playerX: 400,
    playerY: 450,
    doorCoords: doorCoords
  });

  // this.initiateBoxes();
  // this.initiateTriggers();
  this.initiateRamps();
  // this.initiateShrooms();
};

Util.inherits(CrazyRoom, BasicRoom);

// CrazyRoom.prototype.initiateBoxes = function () {
//   var worldContext = this;
//
//   this._allObjects.push(new this.Box({
//     pos : { x : 0, y : 0},
//     context : this.game.context,
//     width: 300,
//     height: worldContext.height,
//   }));
// };
//
// CrazyRoom.prototype.initiateTriggers = function () {
//   var worldContext = this;
//
//   this._allObjects.push(new this.Trigger({
//     pos : { x : 800, y : this.height - 70 },
//     context : this.game.context,
//     width: 50,
//     height: 50,
//     activate: function () {
//       if (this.notActivated) {
//         worldContext.game.startCountdown();
//         worldContext.game.countdownActive = true;
//         this.notActivated = false;
//       }
//     }
//   }));
//
//   this._allObjects.push(new this.Trigger({
//     pos : { x : 8800, y : this.height - 70 },
//     context : this.game.context,
//     width: 50,
//     height: 50,
//     activate: function () {
//       if (this.notActivated) {
//         worldContext.game.stopCountdown();
//         console.log('you win, motherfuckers');
//         this.notActivated = false;
//       }
//     }
//   }));
//
//   this._allObjects.push(new this.Door({
//     pos : { x : this.playerStart.x, y : this.height - 110 },
//     context : this.game.context,
//     width: 70,
//     height: 100,
//     activate: function () {
//       worldContext.game.onDoor({
//         door: 'hallway1',
//         coords: {
//           x: 2800,
//           y: 390
//         }
//       });
//     }
//   }));
//
//   this._allObjects.push(new this.Door({
//     pos : { x : 8870, y : this.height - 110 },
//     context : this.game.context,
//     width: 70,
//     height: 100,
//     activate: function () {
//       worldContext.game.onDoor({
//         door: 'eventHallway',
//         coords: {
//           x: 50,
//           y: 390
//         }
//       });
//     }
//   }));
//
//   // this._allObjects.push(new Trigger({
//   //   pos : { x : 1200, y : this.height - 70 },
//   //   context : this.game.context,
//   //   width: 50,
//   //   height: 50,
//   //   activate: function () {
//   //     worldContext.textOverlays.push(
//   //       new TextOverlay({
//   //         message: "aye bruh",
//   //         fontSize: 24,
//   //       })
//   //     );
//   //   }
//   // }));
//   //
//   // this._allObjects.push(new Trigger({
//   //   pos : { x : 1700, y : this.height - 70 },
//   //   context : this.game.context,
//   //   width: 50,
//   //   height: 50,
//   //   activate: function () {
//   //     worldContext.textOverlays.push(
//   //       new TextOverlay({
//   //         message: "honkey tonk",
//   //         fontSize: 24,
//   //       })
//   //     );
//   //   }
//   // }));
//   //
//   // this._allObjects.push(new Trigger({
//   //   pos : { x : 1300, y : this.height - 1070 },
//   //   context : this.game.context,
//   //   width: 50,
//   //   height: 50,
//   //   activate: function () {
//   //     worldContext.textOverlays.push(
//   //       new TextOverlay({
//   //         message: "hey tony whered you \ get that fresh peperoney",
//   //         fontSize: 24,
//   //       })
//   //     );
//   //   }
//   // }));
// };

CrazyRoom.prototype.initiateRamps = function () {
  this._allObjects.push(new this.Ramp({
    pos : { x : 0, y : 0 },
    context : this.game.context,
    width: 800,
    height: 7000,
    slant: 'tl-br'
  }));
//
//   this._allObjects.push(new this.Ramp({
//     pos : { x : 2400, y : this.height - 350 },
//     context : this.game.context,
//     width: 800,
//     height: 400,
//     slant: 'bl-tr'
//   }));
// };
//
// CrazyRoom.prototype.initiateShrooms = function () {
//   this._allObjects.push(new this.Shroom({
//     pos : { x : 4000, y : this.height - 150 },
//     context : this.game.context,
//     width: 200,
//     height: 200,
//   }));
};

module.exports = CrazyRoom;
