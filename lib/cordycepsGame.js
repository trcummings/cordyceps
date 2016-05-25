var Game = require("./game");
var GameView = require("./gameView");
// var Player = require('./player.js');
// var Camera = require('./camera.js');

document.addEventListener("DOMContentLoaded", function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');

  // var player = new Player(context);
  // var camera = new Camera(document.body.clientHeight, document.body.clientWidth);

  // starting to render
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

//
//   // check inputs
//   // up - w
//   if (inputs[87]) {
//     player.acel.y = -6;
//   }
//
//   // down - s
//   else if (inputs[83]) {
//     player.acel.y = 6;
//   }
//
//   // left - a
//   if (inputs[65]) {
//     player.acel.x = -6;
//   }
//
//   // right - d
//   else if (inputs[68]) {
//     player.acel.x = 6;
//   }
//
//   // shift - screen shake
//   if (inputs[16]) {
//     camera.strength = 90;
//     camera.damper = 5;
//   }
//
