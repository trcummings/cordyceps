var LevelSwitchUtil = require('./util/levelSwitchUtil');
var canvas = document.getElementById("canvas");

var Menu = function (context) {
  this.context = context;

  var startButton = document.getElementById('start-game');
  startButton.addEventListener('click', function () {
    startButton.parentNode.removeChild(startButton);
    LevelSwitchUtil.startGame(this.context);
  }.bind(this));

  this.draw(context);
};

Menu.prototype.draw = function(context) {
  this.clearBlack(context);

  context.beginPath();
  context.fillStyle = 'white';
  context.font = 72 +"pt Arial ";
  context.fillText('cordyceps', 280, 200);

  context.fillRect(400, 400, 200, 100);

  context.fillStyle = "black";
  context.font = 30 +"pt Arial ";
  context.fillText('start', 460, 460);

  requestAnimationFrame(this.draw.bind(this, context));
};

Menu.prototype.clearBlack = function (context) {
  context.beginPath();
  context.fillRect(0, 0, canvas.width, canvas.height);
};

module.exports = Menu;
