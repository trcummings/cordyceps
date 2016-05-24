var GameView = function (game, context) {
  this.context = context;
  this.game = game;
};

GameView.prototype.bindKeyHandlers = function () {
  //write screenshake method
  key("space", function () { this.game.screenShake(); }.bind(this));
};

GameView.prototype.start = function () {
  this.bindKeyHandlers();
  this.lastTime = 0;
  //start the animation
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function(time){
  var timeDelta = time - this.lastTime;

  this.game.step(timeDelta);
  this.game.draw(this.context);
  this.lastTime = time;

  //every call to animate requests causes another call to animate
  requestAnimationFrame(this.animate.bind(this));
};

module.exports = GameView;
