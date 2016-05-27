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
  var playerX = this.player.pos.x - this.camera.cpos.x;
  var playerY = this.player.pos.y - this.camera.cpos.y;
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
  this.player.grounded = false;

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

      if (dir === "l") {
      // console.log("collision on left!");
        this.leftColliding = true;
        this.player.velocity.x = 0;
        this.leftColliding = false;

      } else if (dir === "r") {
        // console.log("collision on right!");
        this.rightColliding = true;
        this.player.velocity.x = 0;
        this.leftColliding = true;

      } else if (dir === "b") {
        // console.log("collision at bottom!");
        this.player.grounded = true;
        this.player.jumping = false;

      } else if (dir === "t") {
        // console.log("collision at top!");
        this.player.velocity.y *= -1;
      }
  }
};

Game.prototype.collisionCheck = function (player, obj2) {
    // get the vectors to check against
    var vX = (player.pos.x + (player.width / 2)) - (obj2.cpos.x + (obj2.width / 2)),
        vY = (player.pos.y + (player.height / 2)) - (obj2.cpos.y + (obj2.height / 2)),
        // add the half widths and half heights of the objects
        halfWidths = (player.width / 2) + (obj2.width / 2),
        halfHeights = (player.height / 2) + (obj2.height / 2),
        colDir = null;

    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {
        // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = halfWidths - Math.abs(vX),
            oY = halfHeights - Math.abs(vY);
        if (oX >= oY) {
          if (vY > 0) {
            colDir = "t";
            player.pos.y += oY;
          } else {
            colDir = "b";
            player.pos.y -= oY;
          }
        } else {
          if (vX > 0) {
            colDir = "l";
            player.pos.x += oX;
          } else {
            colDir = "r";
            player.pos.x -= oX;
          }
        }
    }
    return colDir;
};

module.exports = Game;
