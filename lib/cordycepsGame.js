var Menu = require('./menu');
var LevelSwitchUtil = require('./levelSwitchUtil');

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 600;

  new Menu(context, LevelSwitchUtil.gameStartCallback);
});
