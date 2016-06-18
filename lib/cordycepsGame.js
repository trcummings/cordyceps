var Menu = require('./menu');
var LevelOne = require('./levels/levelOne');
var GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 600;

  var gameStartCallback = function () {
    var levelOne = new LevelOne(context);
    new GameView(levelOne).start();
  };

  new Menu(context, gameStartCallback);
});
