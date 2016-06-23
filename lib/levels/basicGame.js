var Player = require('../player.js');
var Camera = require('../camera.js');
var Trigger = require('../objects/trigger');
var Ramp = require('../objects/ramp');
var Door = require('../objects/door');
var canvas = document.getElementById("canvas");

var BasicGame = function (context, options, endLevel, endGame) {
  // options has: initialRoom, rooms
  this.endLevel = endLevel;
  this.endGameCB = endGame;
  this.options = options;
  this.deathCount = 0;
  this.countdownActive = false;
  this.specialRenders = [];
  this.cutsceneTimers = [];
  this.switchRooms(context, { door: options.initialRoom });
};

BasicGame.prototype.switchRooms = function (context, room) {
  var options = this.options;

  this.context = context;
  this.rooms = options.rooms;

  this.world = new this.rooms[room.door](this, room.coords);
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

  this.cameraTarget = this.player;
  this._staticObjects = this.world._staticObjects;
  this._movingObjects = this.world._movingObjects;
};

BasicGame.prototype.step = function() {
  this.moveObjects();
  this.checkAllCollisions();
  this.draw();
};

BasicGame.prototype.moveObjects = function () {
  this.camera.move(this.cameraTarget);
  this._movingObjects.forEach(function (obj) {
    obj.move(this.player);
  }.bind(this));
  this.player.move();
};

BasicGame.prototype.draw = function() {
  var _allObjects = this._staticObjects.concat(this._movingObjects).concat([this.player]);
  this.clearBlack();

  _allObjects.forEach(function (obj) {
    obj.render(this.camera);
  }.bind(this));

  this.specialRenders.forEach(function (render) {
    render();
  });

  this.blackBars();
};

BasicGame.prototype.clearBlack = function () {
  var context = this.context;
  var camera = this.camera;

  context.beginPath();
  context.fillRect(0, 0, canvas.width, canvas.height);
};

BasicGame.prototype.blackBars = function () {
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

BasicGame.prototype.checkAllCollisions = function () {
  this._movingObjects.concat(this._staticObjects).forEach(function (obj) {
    this.collisionCheck(this.player, obj);
  }.bind(this));
};


BasicGame.prototype.collisionCheck = function (obj1, obj2) {
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
    obj2.collision(obj1);
  }
};

BasicGame.prototype.startCountdown = function () {
  if (this.countdownActive === false) {
    this.uptickDeathCount();
  }
};

BasicGame.prototype.uptickDeathCount = function () {
  this.deathCount++;
  this.deathTimer = window.setTimeout(this.uptickDeathCount.bind(this), 1000);
};

BasicGame.prototype.stopCountdown = function () {
  window.clearTimeout(this.deathTimer);
};

BasicGame.prototype.enterDoor = function (door) {
  if (door) {
    this.switchRooms(
      this.context,
      door
    );
  }
};

BasicGame.prototype.endLevel = function () {
  this.endLevelCallback(this.context);
};

BasicGame.prototype.endGame = function () {
  this.cutsceneTimers.forEach(function (timer) {
    window.clearTimeout(timer);
  });
  this.endGameCB(this, this.context);
};

BasicGame.prototype.playLockedDoorClick = function () {
  console.log('click');
};

module.exports = BasicGame;
