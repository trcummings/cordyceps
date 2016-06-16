var Player = require('./player.js');
var Camera = require('./camera.js');
var Util = require('./util.js');
var TempWorld = require('./tempWorld.js');
var canvas = document.getElementById("canvas");
var Trigger = require('./objects/trigger');
var Ramp = require('./objects/ramp');


var Game = function (context) {
  this.context = context;
  this.world = new TempWorld(this);
  this.height = this.world.height;
  this.width = this.world.width;
  this.camera = new Camera(canvas.height, canvas.width, this.world); //replace these values

  this.player = new Player(
    context,
    this.world.playerStart.x,
    this.world.playerStart.y
  );

  this._staticObjects = this.world._allObjects;
  this._movingObjects = [this.player];
  // this.entities = [];

  // this.initiateEntities();
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

  _allObjects.forEach(function (obj) {
    obj.render(this.camera);
  }.bind(this));
};

Game.prototype.clearBlack = function () {
  var canvas = document.getElementById("canvas");
  var context = this.context;
  var camera = this.camera;

  context.beginPath();
  if (camera.height < canvas.height) {
    // context.fillStyle = "white";
    // context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
    // context.fillStyle = "black";
    // context.fillRect(0, canvas.height - camera.height, canvas.width, camera.height);
    // context.fillStyle = "white";
    // context.fillRect(0, camera.height, canvas.width, window.innerHeight);
  } else {
    var grad = context.createLinearGradient(0, 0, this.player.pos.x/3, 0);
      grad.addColorStop(0, "white");
      grad.addColorStop(0.5, "red");
      grad.addColorStop(1, "black");
    context.fillStyle = grad;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};

// Game.prototype.initiateEntities = function () {
//   for (var i = 0; i < 2000; i++) {
//     var randx = Math.random() * 6 * this.width;
//     var randy = Math.random() * 6 * this.height;
//     this.entities.push({
//       pos : { x : randx, y : randy },
//       acel : { x: 0, y : 0 }
//     });
//   }
// };
//
// Game.prototype.drawEntities = function () {
//   for (var i = 0; i < this.entities.length; i++) {
//     var entity = this.entities[i];
//     var entityX = entity.pos.x - this.camera.cpos.x;
//     var entityY = entity.pos.y - this.camera.cpos.y;
//     if ((entityX >= this.camera.cullDistX.left && entityX <= this.camera.cullDistX.right) &&
//         (entityY >= this.camera.cullDistY.top && entityY <= this.camera.cullDistY.bottom) ) {
//       this.context.beginPath();
//       this.context.fillStyle="gold";
//       this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
//       this.context.fill();
//     }
//   }
// };


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

  //
  // this.world.triggers.forEach(function (trigger) {
  //   dir = this.collisionCheck(this.player, trigger);
  //   if (dir) {
  //     trigger.activate();
  //   }
  // }.bind(this));
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
        // bumpValue;


    if (obj2 instanceof Trigger) {
      bumpValue = 0;
    } else if (obj2 instanceof Ramp) {
      bumpValue = 0;
    } else {
      bumpValue = 1;
    }

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
  }
};

module.exports = Game;
