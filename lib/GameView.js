var GameView = function (game, context) {
  this.context = context;
  this.game = game;
  this.inputs = {};
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();

  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.bindKeyHandlers = function () {
  document.body.addEventListener("keydown", function(e) {
    this.inputs[e.keyCode] = true;
  }.bind(this));

  document.body.addEventListener("keyup", function(e) {
    this.inputs[e.keyCode] = false;
  }.bind(this));
};

GameView.prototype.animate = function() {
  this.keyCheck();
  this.game.render();
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.keyCheck = function () {
  // check inputs
  // jump - w
  if (this.inputs[87]) {
    this.game.player.impulse('y', 'neg');
  }

  // down - s
  else if (this.inputs[83]) {
    this.game.player.impulse('y', 'pos');
  }

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

module.exports = GameView;
