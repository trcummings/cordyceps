var LevelSwitchUtil = require('./util/levelSwitchUtil');
var canvas = document.getElementById("canvas");

var Menu = function (context, title, buttonText) {
  this.context = context;

  var startButton = document.getElementById('start-game');
  startButton.addEventListener('click', function () {
    this.button = startButton;
    startButton.parentNode.removeChild(startButton);
    LevelSwitchUtil.startGame(this.context, this);
  }.bind(this));

  this.drawStart(context, title, buttonText);
};

Menu.prototype.drawStart = function (context, title, buttonText) {
  var titleX, buttonX;

  this.clearBlack(context);

  context.beginPath();
  context.fillStyle = 'white';
  context.font = 72 +"pt Arial ";
  if (title === 'cordyceps') {
    titleX = 280;
  } else {
    titleX = 190;
  }

  context.fillText(title, titleX, 200);

  context.fillRect(400, 400, 200, 100);

  context.fillStyle = "black";
  context.font = 30 +"pt Arial ";
  if (buttonText === 'start') {
    buttonX = 460;
  } else {
    buttonX = 440;
  }

  context.fillText(buttonText, buttonX, 460);

  this.animFrame = requestAnimationFrame(this.drawStart.bind(this, context, title, buttonText));
};

Menu.prototype.clearBlack = function (context) {
  context.beginPath();
  context.fillRect(0, 0, canvas.width, canvas.height);
};

Menu.prototype.drawEnd = function (context) {
  cancelAnimationFrame(this.animFrame);
  this.clearBlack(context);

  document.getElementsByTagName('div')[0].appendChild(this.button);

  new Menu(context, 'please try again', 'it hurts');
};

module.exports = Menu;
