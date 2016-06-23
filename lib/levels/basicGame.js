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
  this.topRenders = [];
  this.cutsceneTimers = [];
  this.crazyColor = 'black';

  this.particles = [];
  this.tick = 0;
  this.particlesOn = false;

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

  if (this.particlesOn) {
    this.createParticles();
    this.updateParticles();
    this.killParticles();
  }

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

  if (this.countdownActive) {
    this.crazyBackground();
  }

  if (this.particlesOn) {
    this.drawParticles();
  }

  _allObjects.forEach(function (obj) {
    obj.render(this.camera);
  }.bind(this));

  this.specialRenders.forEach(function (render) {
    render();
  });

  this.topRenders.forEach(function (obj) {
    obj.render(this.camera);
  }.bind(this));

  this.blackBars();
};

BasicGame.prototype.clearBlack = function () {
  var context = this.context;
  var camera = this.camera;

  context.beginPath();
  context.fillRect(0, 0, canvas.width, canvas.height);
};

BasicGame.prototype.crazyBackground = function () {
  var context = this.context;
  var camera = this.camera;
  // x, y, width, height

  if (!this.colorInterval) {
    this.colorInterval = setInterval(function () {
      this.crazyColor = '#' + Math.random().toString(16).substr(-6);
    }.bind(this), 80);
  }

  context.globalAlpha = (this.deathCount + 1) / 200;
  // context.globalAlpha = 0.3;
  context.fillStyle = this.crazyColor;
  context.fillRect(0, 0, camera.width, camera.height);
  context.globalAlpha = 1;
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
    this.countdownActive = true;
    this.uptickDeathCount();
  }
};

BasicGame.prototype.uptickDeathCount = function () {
  this.deathCount++;
  if (this.deathCount === 100) {
    this.endGameCB(this, this.context);
  }
  this.deathTimer = window.setTimeout(this.uptickDeathCount.bind(this), 1000);
};

BasicGame.prototype.stopCountdown = function () {
  window.clearTimeout(this.deathTimer);
  this.deathCount = 0;
  this.countdownActive = false;
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



BasicGame.prototype.createParticles = function () {
  //check on every 10th tick check
  if(this.tick % 10 === 0) {
      if(this.particles.length < 1000) {
          this.particles.push({
            x: Math.random()*this.width, //between 0 and canvas width
            y: 0,
            speed: 2+Math.random()*3, //between 2 and 5
            radius: 5+Math.random()*5, //between 5 and 10
            color: 'yellow',
          });
      }
  }
};

BasicGame.prototype.drawParticles = function () {
  for(var i in this.particles) {
      var part = this.particles[i];
      this.context.beginPath();
      this.context.arc(
        part.x - this.camera.cpos.x,
        part.y - this.camera.cpos.y,
        part.radius, 0, Math.PI*2);
      this.context.closePath();
      if (this.deathCount > 30) {
        part.color = 'white';
      } else {
        part.color = 'yellow';
      }

      // if (this.deathCount > 10) {
      //   part.color = 'white';
      //
      //   var trails = this.deathCount / 10;
      //   part.y += 10 * trails;
      //   for (var x = 0; x < trails; x++) {
      //     this.context.globalAlpha = 1 / trails + 1;
      //     this.context.fillStyle = part.color;
      //     this.context.fill();
      //     part.y -= 5 * i;
      //   }
      //   this.context.globalAlpha = 1;
      //   //
      //   // part.y -= 10;
      //   // this.context.globalAlpha = 0.30;
      //   // this.context.fillStyle = part.color;
      //   // this.context.fill();
      //   // part.y += 5;
      //   // this.context.globalAlpha = 0.60;
      //   // this.context.fillStyle = part.color;
      //   // this.context.fill();
      //   // part.y += 5;
      //   // this.context.globalAlpha = 1;
      // }
      this.context.fillStyle = part.color;
      this.context.fill();
  }
};

BasicGame.prototype.updateParticles = function () {
  for(var i in this.particles) {
      var part = this.particles[i];
      part.y += part.speed;
  }
};

BasicGame.prototype.killParticles = function () {
  for(var i in this.particles) {
      var part = this.particles[i];
      if(part.y > this.height) {
          part.y = 0;
      }
  }
};

module.exports = BasicGame;
