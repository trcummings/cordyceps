// var Game = require("./game");
var LevelOne = require('./levels/levelOne');
var GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  canvas.width = 1000;
  canvas.height = 600;

  var levelOne = new LevelOne(context);
  new GameView(levelOne).start();
});
