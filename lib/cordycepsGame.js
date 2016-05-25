var Game = require("./game");
var GameView = require("./gameView");

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var game = new Game(context);
  new GameView(game, context).start();

  // // start everything and handle stopping
  // anim = requestAnimationFrame(update);
  // document.addEventListener("keydown", function(ev) {
  //   if (ev.keyCode === 27) {
  //     cancelAnimationFrame(anim);
  //   }
  // });
});
