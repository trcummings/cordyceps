var Player = require('./player.js');
var Camera = require('./camera.js');
var Util = require('./util.js');
var TempWorld = require('./rooms/tempWorld.js');
var HallwayOne = require('./rooms/hallway1.js');
var EnemyRoom = require('./rooms/enemyRoom.js');
var EventHallway = require('./rooms/eventHallway.js');
var CrazyRoom = require('./rooms/crazyRoom.js');
var Trigger = require('./objects/trigger');
var Ramp = require('./objects/ramp');
var Door = require('./objects/door');
var canvas = document.getElementById("canvas");


var Game = function (context) {
  this.switchRooms(context, { door: 'hallway1' });
  // this.switchRooms(context, { door: 'crazyRoom' });
  this.deathCount = 0;
  this.countdownActive = false;
};

Game.prototype.switchRooms = function (context, room) {
  // this.fadeOut(context);
  this.context = context;

  this.rooms = {
    hallway1: new HallwayOne(this, room.coords),
    tempWorld: new TempWorld(this, room.coords),
    enemyRoom: new EnemyRoom(this, room.coords),
    eventHallway: new EventHallway(this, room.coords),
    crazyRoom: new CrazyRoom(this, room.coords)
  };

  this.world = this.rooms[room.door];

  this.height = this.world.height;
  this.width = this.world.width;

  this.camera = new Camera(
    canvas.height,
    canvas.width,
    this.world
  );

  this.player = new Player(
    context,
    this.world.playerStart.x,
    this.world.playerStart.y,
    this.world.playerJump
  );

  this.playerOnDoor = false;

  this.cameraTarget = this.player;

  this._staticObjects = this.world._allObjects;
  this._movingObjects = [this.player];
  this.entities = [];

  this.initiateEntities();
  // this.fadeIn(context, this.camera);
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkAllCollisions();
  this.draw();
};

Game.prototype.moveObjects = function () {
  this.camera.move(this.player);
  this.player.move();
};

Game.prototype.draw = function() {
  var _allObjects = this._staticObjects.concat(this._movingObjects);

  this.clearBlack();
  this.drawEntities();

  _allObjects.forEach(function (obj) {
    obj.render(this.camera);
  }.bind(this));

  // this.player.renderTrails();
  this.blackBars();
};

// Game.prototype.fadeIn = function (context, camera) {
//   var alpha = 0;
//   var fader = function () {
//     if (alpha < 1) {
//       context.globalAlpha = alpha;
//       context.fillRect(canvas.width - camera.width, canvas.height - camera.height, canvas.width, canvas.height);
//       alpha += 0.1;
//
//       requestAnimationFrame(fader);
//     }
//   }.bind(this);
//
//   fader();
// };
//
// Game.prototype.fadeOut = function (context) {
//   var alpha = 1;
//   var fader = function () {
//     if (alpha > 0) {
//       context.globalAlpha = alpha;
//       context.fillRect(0, 0, canvas.width, canvas.height);
//       alpha -= 0.1;
//
//       requestAnimationFrame(fader);
//     }
//   }.bind(this);
//
//   fader();
// };

Game.prototype.clearBlack = function () {
  var context = this.context;
  var camera = this.camera;

  context.beginPath();
  var grad = context.createLinearGradient(0, 0, this.player.pos.x/3, 0);
    grad.addColorStop(0, "white");
    grad.addColorStop(0.5, "red");
    grad.addColorStop(1, "black");
  context.fillStyle = grad;
  context.fillRect(0, 0, canvas.width, canvas.height);
};

Game.prototype.blackBars = function () {
  var context = this.context;
  var camera = this.camera;
  // x, y, width, height

  context.fillStyle = "black";
  // top - bottom
  context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
  context.fillRect(0, camera.height, canvas.width, canvas.height);

  // clears right side if smaller than canvas
  context.fillRect(camera.width, 0, canvas.width - camera.width, canvas.height);
};

Game.prototype.initiateEntities = function () {
  for (var i = 0; i < 20000; i++) {
    var randx = Math.random() * 6 * this.width;
    var randy = Math.random() * 6 * this.height;
    this.entities.push({
      pos : { x : randx, y : randy },
      acel : { x: 0, y : 0 }
    });
  }
};

Game.prototype.drawEntities = function () {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    var entityX = entity.pos.x - this.camera.cpos.x;
    var entityY = entity.pos.y - this.camera.cpos.y;
    if ((entityX >= this.camera.cullDistX.left && entityX <= this.camera.cullDistX.right) &&
        (entityY >= this.camera.cullDistY.top && entityY <= this.camera.cullDistY.bottom) ) {
      this.context.beginPath();
      this.context.fillStyle="gold";
      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
      this.context.fill();
    }
  }
};


// Game.prototype.drawOverlays = function () {
//   var overlays = this.world.textOverlays;
//
//   if (overlays.length > 0) {
//     // debugger;
//     overlays.forEach(function (overlay, index) {
//       if (index === 0) {
//         overlay.draw(this.context, this.camera.width/10, 2*this.camera.height/3);
//       } else if (overlays[index - 1] && (overlays[index - 1].message !== overlay.message)) {
//         overlay.draw(this.context, this.camera.width/10, 2*this.camera.height/3);
//         if (overlay.alpha < 0) {
//           overlays.splice(index, 1);
//         }
//       }
//       // overlay.draw(this.context, this.player.pos.x, this.player.pos.y - 45);
//     }.bind(this));
//   }
// };

Game.prototype.checkAllCollisions = function () {
  this._movingObjects.forEach(function (movingObj) {
    this._staticObjects.forEach(function (staticObj) {
      this.collisionCheck(movingObj, staticObj);
    }.bind(this));
  }.bind(this));
};


Game.prototype.collisionCheck = function (obj1, obj2) {
// get the vectors to check against
var xVector = (obj1.pos.x + (obj1.width / 2)) - (obj2.pos.x + (obj2.width / 2)),
    yVector = (obj1.pos.y + (obj1.height / 2)) - (obj2.pos.y + (obj2.height / 2)),
    // add the half widths and half heights of the objects
    halfWidths = (obj1.width / 2) + (obj2.width / 2),
    halfHeights = (obj1.height / 2) + (obj2.height / 2);

// if the x and y vector are less than the half width or half height,
// then we must be inside the object, causing a collision
if (Math.abs(xVector) < halfWidths && Math.abs(yVector) < halfHeights) {
    // figures out on which side we are colliding (top, bottom, left, or right)
    var oX = halfWidths - Math.abs(xVector),
        oY = halfHeights - Math.abs(yVector);

    if (oX >= oY) {
      if (yVector > 0) {
        obj1.collisions.push([obj2, "top", oY]);
        obj2.collision(obj1, "bottom", -oY);
      } else {
        obj1.collisions.push([obj2, 'bottom', -oY]);
        obj2.collision(obj1, 'top', oY);
      }
    } else {
      if (xVector > 0) {
        obj1.collisions.push([obj2, "left", oX]);
        obj2.collision(obj1, "right", -oX);
      } else {
        obj1.collisions.push([obj2, "right", -oX]);
        obj2.collision(obj1, "left", oX);
      }
    }
  } else {
    if (((obj1 instanceof Player && obj2 instanceof Door) ||
         (obj2 instanceof Player && obj1 instanceof Door)) &&
         (!this.playerOnDoor)) {
      this.onDoor();
    }
  }
};

Game.prototype.startCountdown = function () {
  if (this.countdownActive === false) {
    this.uptickDeathCount();
  }
};

Game.prototype.uptickDeathCount = function () {
  this.deathCount++;
  this.deathTimer = window.setTimeout(this.uptickDeathCount.bind(this), 1000);
};

Game.prototype.stopCountdown = function () {
  window.clearTimeout(this.deathTimer);
};

Game.prototype.onDoor = function (door) {
  if (door) {
    this.playerOnDoor = door;
  } else {
    this.playerOnDoor = false;
  }
};

Game.prototype.enterDoor = function () {
  if (this.playerOnDoor) {
    this.switchRooms(
      this.context,
      this.playerOnDoor
    );
  }
};

module.exports = Game;
