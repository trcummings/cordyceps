var Player = require('./player.js');
var Camera = require('./camera.js');
var Util = require('./util.js');
var TempWorld = require('./tempWorld.js');
var canvas = document.getElementById("canvas");

var Game = function (context) {
  this.context = context;
  this.world = new TempWorld();
  this.height = this.world.height;
  this.width = this.world.width;
  this.camera = new Camera(canvas.height, canvas.width, this.world); //replace these values
  this.player = new Player(context, 50, this.world.height - 50);
  this.entities = [];

  this.initiateEntities();
};

Game.prototype.step = function() {
  this.moveObjects();
  // this.checkCollisions();
  this.render();
};

Game.prototype.moveObjects = function () {
  this.camera.move(this.player);
  this.player.move();
};

Game.prototype.render = function() {
  this.clearBlack();

  // draw this.player with corrected positions
  var playerX = this.player.cpos.x - this.camera.cpos.x;
  var playerY = this.player.cpos.y - this.camera.cpos.y;
  this.player.render(playerX, playerY);

  this.drawBoxes();
  this.drawEntities();
};

Game.prototype.clearBlack = function () {
  var canvas = document.getElementById("canvas");
  var context = this.context;
  var camera = this.camera;

  context.beginPath();
  if (camera.height < canvas.height) {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
    context.fillStyle = "black";
    context.fillRect(0, canvas.height - camera.height, canvas.width, camera.height);
    context.fillStyle = "white";
    context.fillRect(0, camera.height, canvas.width, window.innerHeight);
  } else {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
};

Game.prototype.initiateEntities = function () {
  for (var i = 0; i < 200; i++) {
    var randx = Math.random() * 6 * this.width;
    var randy = Math.random() * 6 * this.height;
    this.entities.push({
      cpos : { x : randx, y : randy },
      ppos : { x : randx, y : randy },
      acel : { x: 0, y : 0 }
    });
  }
};

Game.prototype.drawEntities = function () {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    var entityX = entity.cpos.x - this.camera.cpos.x;
    var entityY = entity.cpos.y - this.camera.cpos.y;
    if ((entityX >= this.camera.cullDistX.left && entityX <= this.camera.cullDistX.right) &&
        (entityY >= this.camera.cullDistY.top && entityY <= this.camera.cullDistY.bottom) ) {
      this.context.beginPath();
      this.context.fillStyle="gold";
      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
      this.context.fill();
    }
  }
};

Game.prototype.drawBoxes = function () {
  for (var i = 0; i < this.world.boxes.length; i++) {
    var box = this.world.boxes[i];
    var boxX = box.cpos.x - this.camera.cpos.x;
    var boxY = box.cpos.y - this.camera.cpos.y;
    // if ((boxX >= this.camera.cullDistX.left && boxX <= this.camera.cullDistX.right) &&
        // (boxY >= this.camera.cullDistY.top && boxY <= this.camera.cullDistY.bottom) ) {
      this.context.fillStyle = "green";
      this.context.beginPath();
      this.context.fillRect(boxX, boxY, box.width, box.height);
    // }

      var dir = this.collisionCheck(this.player, box);

      if (dir === "l" || dir === "r") {
        console.log("collision at side!");
          // player.velX = 0;
          // player.jumping = false;
      } else if (dir === "b") {
        console.log("collision at bottom!");
          // player.grounded = true;
          // player.jumping = false;
      } else if (dir === "t") {
        console.log("collision at top!");
          // player.velY *= -1;
      }
  }
};

// Game.prototype.allObjects = function () {
//   return [].concat(this.boxes, this.entities);
// };
//
// Game.prototype.checkCollisions = function () {
//   this.allObjects().forEach(function (object) {
//     this.collisionCheck(object, this.player);
//   }.bind(this));
// };

// Collision checking
Game.prototype.collisionCheck = function (obj1, obj2) {
    // get the vectors to check against
    var vX = (obj1.ppos.x + (obj1.width / 2)) - (obj2.ppos.x + (obj2.width / 2)),
        vY = (obj1.ppos.y + (obj1.height / 2)) - (obj2.ppos.y + (obj2.height / 2)),
        // add the half widths and half heights of the objects
        halfWidths = (obj1.width / 2) + (obj2.width / 2),
        halfHeights = (obj1.height / 2) + (obj2.height / 2),
        colDir = null;

    // debugger;
    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {
      // debugger;
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = halfWidths - Math.abs(vX),
            oY = halfHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                // obj1.y += oY;
            } else {
                colDir = "b";
                // obj1.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                // obj1.x += oX;
            } else {
                colDir = "r";
                // obj1.x -= oX;
            }
        }
    }
    return colDir;
};

module.exports = Game;

// Game.BG_COLOR = "#000000";
// Game.DIM_X = 1000;
// Game.DIM_Y = 600;
// Game.FPS = 32;
//

//

//
// Game.prototype.draw = function (context) {
//   context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//   context.fillStyle = Game.BG_COLOR;
//   context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
//
//   // this.allObjects().forEach(function (object) {
//   //   object.draw(context);
//   // });
// };
//
// Game.prototype.isOutOfBounds = function (pos) {
//   return (pos[0] < 0) || (pos[1] < 0) ||
//     (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
// };
//
// Game.prototype.moveObjects = function (delta) {
//   this.allObjects().forEach(function (object) {
//     object.move(delta);
//   });
// };
//
// Game.prototype.randomPosition = function () {
//   return [
//     Game.DIM_X * Math.random(),
//     Game.DIM_Y * Math.random()
//   ];
// };
//
// Game.prototype.remove = function (object) {
//   // if (object instanceof Bullet) {
//   //   this.bullets.splice(this.bullets.indexOf(object), 1);
//   // } else if (object instanceof Asteroid) {
//   //   var idx = this.asteroids.indexOf(object);
//   //   this.asteroids[idx] = new Asteroid({ game: this });
//   // } else if (object instanceof Ship) {
//   //   this.ships.splice(this.ships.indexOf(object), 1);
//   // } else {
//   //   throw "wtf?";
//   // }
// };
//
// Game.prototype.step = function (delta) {
//   this.moveObjects(delta);
//   this.checkCollisions();
// };
