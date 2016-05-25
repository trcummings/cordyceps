var Player = require('./player.js');
var Camera = require('./camera.js');
var canvas = document.getElementById("canvas");

var Game = function (context) {
  this.context = context;
  this.height = canvas.height;
  this.width = canvas.width;
  this.camera = new Camera(this.height, this.width); //replace these values
  this.player = new Player(context);
  this.entities = [];
  this.boxes = [];

  this.initiateBoxes();
  this.initiateEntities();
};

Game.prototype.render = function(player, camera) {
  this.camera.move(this.player.cpos.x, this.player.cpos.y);
  this.player.move();

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
    if ((entityX >= this.camera.cullDistX[0] && entityX <= this.camera.cullDistX[1]) &&
        (entityY >= this.camera.cullDistY[0] && entityY <= this.camera.cullDistY[1]) ) {
      this.context.beginPath();
      this.context.fillStyle="gold";
      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
      this.context.fill();
    }
  }
};

Game.prototype.initiateBoxes = function () {
  // dimensions
  // left box
  this.boxes.push({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: 40,
    height: 6 * this.height
  });

  // right box
  this.boxes.push({
    cpos : { x : 6 * this.width - 10, y : 0 },
    ppos : { x : 6 * this.width - 10, y : 0 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 6 * this.height
  });

  // top box
  this.boxes.push({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: 6 * this.width,
    height: 40,
  });

  // bottom box
  this.boxes.push({
    cpos : { x : 0, y : 6 * this.height - 10 },
    ppos : { x : 0, y : 6 * this.height - 10 },
    acel : { x: 0, y : 0 },
    width: 6 * this.width,
    height: 40,
  });

  this.boxes.push({
    cpos : { x : 220, y : 50 },
    ppos : { x : 220, y : 50 },
    acel : { x: 0, y : 0 },
    width: 80,
    height: 80
  });
};

Game.prototype.drawBoxes = function () {
  for (var i = 0; i < this.boxes.length; i++) {
    var box = this.boxes[i];
    var boxX = box.cpos.x - this.camera.cpos.x;
    var boxY = box.cpos.y - this.camera.cpos.y;
    if ((boxX >= this.camera.cullDistX[0] && boxX <= this.camera.cullDistX[1]) &&
        (boxY >= this.camera.cullDistY[0] && boxY <= this.camera.cullDistY[1]) ) {
      this.context.fillStyle = "green";
      this.context.beginPath();
      this.context.fillRect(boxX, boxY, box.width, box.height);
    }

      // var dir = colCheck(player, boxes[i]);
      //
      // if (dir === "l" || dir === "r") {
      //     player.velX = 0;
      //     player.jumping = false;
      // } else if (dir === "b") {
      //     player.grounded = true;
      //     player.jumping = false;
      // } else if (dir === "t") {
      //     player.velY *= -1;
      // }
  }
};

// Collision checking
// function colCheck(shapeA, shapeB) {
//     // get the vectors to check against
//     var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
//         vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
//         // add the half widths and half heights of the objects
//         hWidths = (shapeA.width / 2) + (shapeB.width / 2),
//         hHeights = (shapeA.height / 2) + (shapeB.height / 2),
//         colDir = null;
//
//     // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
//     if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
//         // figures out on which side we are colliding (top, bottom, left, or right)
//         var oX = hWidths - Math.abs(vX),
//             oY = hHeights - Math.abs(vY);
//         if (oX >= oY) {
//             if (vY > 0) {
//                 colDir = "t";
//                 shapeA.y += oY;
//             } else {
//                 colDir = "b";
//                 shapeA.y -= oY;
//             }
//         } else {
//             if (vX > 0) {
//                 colDir = "l";
//                 shapeA.x += oX;
//             } else {
//                 colDir = "r";
//                 shapeA.x -= oX;
//             }
//         }
//     }
//     return colDir;
// }

module.exports = Game;

// Game.BG_COLOR = "#000000";
// Game.DIM_X = 1000;
// Game.DIM_Y = 600;
// Game.FPS = 32;
//
// Game.prototype.allObjects = function () {
//   return [].concat([] /* types of objects go here maybe */);
// };
//
// Game.prototype.checkCollisions = function () {
// };
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
//
// Game.prototype.screenShake = function () {
//   console.log("its fuckin on now lads");
// };
