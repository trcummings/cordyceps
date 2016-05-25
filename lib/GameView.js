var GameView = function (game, context) {
  this.context = context;
  this.game = game;
  this.inputs = {};
  this.entities = [];

  this.initiateEntities();
};

GameView.prototype.bindKeyHandlers = function () {

  document.body.addEventListener("keydown", function(e) {
    this.inputs[e.keyCode] = true;
  }.bind(this));

  document.body.addEventListener("keyup", function(e) {
    this.inputs[e.keyCode] = false;
  }.bind(this));
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();

  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function() {
  this.keyCheck();

  this.game.camera.move(this.game.player.cpos.x, this.game.player.cpos.y);
  this.game.player.move();

  this.clearBlack();


  // draw this.game.player with corrected positions
  var playerX = this.game.player.cpos.x - this.game.camera.cpos.x;
  var playerY = this.game.player.cpos.y - this.game.camera.cpos.y;
  this.game.player.render(playerX, playerY);

  // draw entities with corrected positions
  this.drawEntities();

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.keyCheck = function () {
  // check inputs
  // jump - w
  if (this.inputs[87]) {
    this.game.player.jump();
  }
  //
  // // down - s
  // else if (this.inputs[83]) {
  //   this.game.player.impulse('y', 'pos');
  // }

  // left - a
  if (this.inputs[65]) {
    this.game.player.impulse('x', 'neg');
  }

  // right - d
  else if (this.inputs[68]) {
    this.game.player.impulse('x', 'pos');
  }

  // shift - screen shake
  if (this.inputs[16]) {
    this.game.camera.screenShake();
  }

  // space - screen squash
  if (this.inputs[32]) {
    this.game.camera.squashCamera();
  }
};

GameView.prototype.initiateEntities = function () {
  for (var i = 0; i < 200; i++) {
    var randx = Math.random() * 6 * document.body.clientWidth;
    var randy = Math.random() * 6 * document.body.clientHeight;
    this.entities.push({
      cpos : { x : randx, y : randy },
      ppos : { x : randx, y : randy },
      acel : { x: 0, y : 0 }
    });
  }
};

GameView.prototype.clearBlack = function () {
  var canvas = document.getElementById("canvas");
  var context = this.context;
  var camera = this.game.camera;

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

GameView.prototype.drawEntities = function () {
  for (var i = 0; i < this.entities.length; i++) {
    var entity = this.entities[i];
    var entityX = entity.cpos.x - this.game.camera.cpos.x;
    var entityY = entity.cpos.y - this.game.camera.cpos.y;
    if ((entityX >= this.game.camera.cullDistX[0] && entityX <= this.game.camera.cullDistX[1]) &&
        (entityY >= this.game.camera.cullDistY[0] && entityY <= this.game.camera.cullDistY[1]) ) {
      this.context.beginPath();
      this.context.fillStyle="gold";
      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
      this.context.fill();
    }
  }
};

module.exports = GameView;
