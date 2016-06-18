var Game = require("./game");
var GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  // canvas.width = 3 * document.body.clientWidth / 4;
  // canvas.height = 3 * document.body.clientHeight / 4;
  canvas.width = 1000;
  canvas.height = 600;

  var game = new Game(context);
  new GameView(game).start();
});
