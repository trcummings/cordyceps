var GameView = function (game, isOver) {
  this.game = game;
  this.inputs = {};
  if (isOver) {
    this.isOver = isOver;
  } else {
    this.isOver = false;
  }
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
  if (!this.isOver) {
    this.keyCheck();
    this.game.step();
    this.animFrame = requestAnimationFrame(this.animate.bind(this));
  }
};

GameView.prototype.keyCheck = function () {
  // check inputs
  // jump - w

  if (!this.game.player.inputDisabled) {
    if (this.inputs[87]) {
      this.game.player.processInput('up');
    }

    // left - a
    if (this.inputs[65]) {
      this.game.player.impulse(-1);
    }

    // right - d
    else if (this.inputs[68]) {
      this.game.player.impulse(1);
    }

    else if (this.inputs[83]) {
      this.game.player.processInput('down');
    }

    if (this.inputs[69]) {
      this.game.player.processInteraction(this.game);
      this.inputs[69] = false;
    }
  }
};

module.exports = GameView;
