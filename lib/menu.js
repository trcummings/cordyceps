var LevelSwitchUtil = require('./util/levelSwitchUtil');
var canvas = document.getElementById("canvas");

var Menu = function (context, title, buttonText) {
  this.context = context;

  var startButton = document.getElementById('start-game');
  var instructionsButton = document.getElementById('instructions');

  this.button = startButton;
  this.instrButton = instructionsButton;

  startButton.addEventListener('click', function () {
    startButton.parentNode.removeChild(startButton);
    instructionsButton.parentNode.removeChild(instructionsButton);

    LevelSwitchUtil.startGame(this.context, this);
  }.bind(this));

  instructionsButton.addEventListener('click', function () {
    startButton.parentNode.removeChild(startButton);
    instructionsButton.parentNode.removeChild(instructionsButton);

    LevelSwitchUtil.instructionsLevel(this.context, this);
  }.bind(this));

  this.drawStart(context, title, buttonText);
};

Menu.prototype.drawStart = function (context, title, buttonText) {
  var titleX, buttonX;
  var buttonText1 = buttonText;
  var buttonText2;

  if (buttonText === 'start') {
    buttonText2 = 'instructions';
  } else {
    buttonText2 = 'please help';
  }

  this.clearBlack(context);

  context.beginPath();
  context.fillStyle = 'white';
  context.font = 72 +"pt Arial ";
  if (title === 'cordyceps') {
    titleX = 280;
  } else {
    titleX = 170;
  }

  context.fillText(title, titleX, 200);

  context.fillRect(400, 300, 200, 100);

  context.fillStyle = "black";
  context.font = 30 +"pt Arial ";
  if (buttonText1 === 'start') {
    buttonX = 460;
  } else {
    buttonX = 440;
  }

  context.fillText(buttonText1, buttonX, 360);

  context.fillStyle = 'white';
  context.fillRect(400, 450, 200, 100);
  context.fillStyle = "black";
  context.font = 30 +"pt Arial ";
  if (buttonText1 === 'start') {
    buttonX = 400;
  } else {
    buttonX = 410;
  }

  context.fillText(buttonText2, buttonX, 510);

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
  document.getElementsByTagName('div')[0].appendChild(this.instrButton);

  new Menu(context, 'please try again', 'it hurts');
};

module.exports = Menu;
