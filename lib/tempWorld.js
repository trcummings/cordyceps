var Box = require('./objects/box');
var Trigger = require('./objects/trigger');
var Player = require('./player.js');
var Camera = require('./camera.js');
var TextOverlay = require('./objects/textOverlay');

var TempWorld = function (game) {
  this.game = game;
  this.height = 2000;
  this.width = 6000;
  this.boxes = [];
  this.triggers = [];
  this.textOverlays = [];

  this.initiateBoxes();
  this.initiateTriggers();
};

TempWorld.prototype.initiateBoxes = function () {
  // left box
  this.boxes.push(new Box({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: 40,
    height: this.height
  }));

  // right box
  this.boxes.push(new Box({
    cpos : { x : this.width - 10, y : 0 },
    ppos : { x : this.width - 10, y : 0 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 6 * this.height
  }));

  // top box
  this.boxes.push(new Box({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: this.width,
    height: 40,
  }));

  // bottom box
  this.boxes.push(new Box({
    cpos : { x : 0, y : this.height - 10 },
    ppos : { x : 0, y : this.height - 10 },
    acel : { x: 0, y : 0 },
    width: this.width,
    height: 40,
  }));

  // 1st platform
  this.boxes.push(new Box({
    cpos : { x : 300, y : this.height - 70 },
    ppos : { x : 300, y : this.height - 70 },
    acel : { x: 0, y : 0 },
    width: 300,
    height: 10,
  }));

  for (var i = 0; i < 2000; i+=200) {
    this.boxes.push(new Box({
      cpos : { x : 300 + i, y : this.height - 70 - i},
      ppos : { x : 300 + i, y : this.height - 70 - i },
      acel : { x: 0, y : 0 },
      width: 300,
      height: 10,
    }));
  }
};

TempWorld.prototype.initiateTriggers = function () {
  var worldContext = this;

  this.triggers.push(new Trigger({
    cpos : { x : 800, y : this.height - 70 },
    ppos : { x : 800, y : this.height - 70 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 50,
    activate: function () {
      worldContext.game.camera.screenShake();
    }
  }));

  this.triggers.push(new Trigger({
    cpos : { x : 1200, y : this.height - 70 },
    ppos : { x : 1200, y : this.height - 70 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 50,
    activate: function () {
      worldContext.textOverlays.push(
        new TextOverlay({
          message: "think about your wife",
          fontSize: 24,
        })
      );
    }
  }));

  this.triggers.push(new Trigger({
    cpos : { x : 1700, y : this.height - 70 },
    ppos : { x : 1700, y : this.height - 70 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 50,
    activate: function () {
      worldContext.textOverlays.push(
        new TextOverlay({
          message: "please stop",
          fontSize: 24,
        })
      );
    }
  }));

  this.triggers.push(new Trigger({
    cpos : { x : 1300, y : this.height - 1070 },
    ppos : { x : 1300, y : this.height - 1070 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 50,
    activate: function () {
      worldContext.textOverlays.push(
        new TextOverlay({
          message: "hey tony whered you \ get that fresh peperoney",
          fontSize: 24,
        })
      );
    }
  }));
};

module.exports = TempWorld;
