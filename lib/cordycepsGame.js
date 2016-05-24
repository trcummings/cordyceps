// var Game = require("./game");
// var GameView = require("./gameView");
//
// document.addEventListener("DOMContentLoaded", function(){
//   var canvasEl = document.getElementById("canvas");
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   var context = canvasEl.getContext("2d");
//   var game = new Game(context);
//   new GameView(game, context).start();
// });

var Player = require('./player.js');
var Camera = require('./camera.js');

var player = Player;
var camera = Camera;


// // camera object
// var camera = {
//   cpos : { x : 0, y : 0 },
//   ppos : { x : 0, y : 0 },
//   acel : { x : 0, y : 0 },
//   height : document.body.clientHeight,
//   width  : document.body.clientWidth,
//   maxHeight : 6 * document.body.clientHeight,
//   maxWidth  : 6 * document.body.clientWidth,
//   cullDist : 300,
//   bound : true,
//   target : { x : 0, y : 0 },
//   strength : 0,
//   damper : 0
// };
//
// // player object
// var player = {
//   cpos : { x : 0, y : 0 },
//   ppos : { x : 0, y : 0 },
//   acel : { x : 0, y : 0 }
// };

// handle input
var inputs = {};
document.addEventListener("keydown", function(ev) {
  inputs[ev.keyCode] = true;
}, false);
document.addEventListener("keyup", function(ev) {
  inputs[ev.keyCode] = false;
}, false);

// init entities
var entities = [];
for (var i = 0; i < 200; i++) {
  var randx = Math.random() * 6 * document.body.clientWidth;
  var randy = Math.random() * 6 * document.body.clientHeight;
  entities.push({
    cpos : { x : randx, y : randy },
    ppos : { x : randx, y : randy },
    acel : { x: 0, y : 0 }
  });
}

// canvas stuff
var canvas = document.getElementById("canvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var context = canvas.getContext('2d');

function clearBlack() {
  context.beginPath();
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}
var anim;
function update() {
  anim = requestAnimationFrame(update);
  // clear screen
  clearBlack();

  // check inputs
  // up - w
  if (inputs[87]) {
    player.acel.y = -6;
  }

  // down - s
  else if (inputs[83]) {
    player.acel.y = 6;
  }

  // left - a
  if (inputs[65]) {
    player.acel.x = -6;
  }

  // right - d
  else if (inputs[68]) {
    player.acel.x = 6;
  }

  // shift - screen shake
  if (inputs[16]) {
    camera.strength = 90;
    camera.damper = 5;
  }

  // get the target point
  camera.target.x = player.cpos.x - (camera.width / 2);
  camera.target.y = player.cpos.y - (camera.height / 2);

  // move camera towards target point
  camera.acel.x += (1 / 8) * (camera.target.x - camera.cpos.x);
  camera.acel.y += (1 / 8) * (camera.target.y - camera.cpos.y);

  // player drag
  player.ppos.x = player.cpos.x + (player.ppos.x - player.cpos.x) * 0.93;
  player.ppos.y = player.cpos.y + (player.ppos.y - player.cpos.y) * 0.93;

  // player verlet
  player.cpos.x += player.acel.x * 0.256;
  player.cpos.y += player.acel.y * 0.256;
  var px = 2 * player.cpos.x - player.ppos.x;
  var py = 2 * player.cpos.y - player.ppos.y;
  player.ppos.x = player.cpos.x;
  player.ppos.y = player.cpos.y;
  player.cpos.x = px;
  player.cpos.y = py;
  player.acel.x = 0;
  player.acel.y = 0;

  // camera shake update
  if (camera.strength > 0) {
    var randx = Math.random() * 2 * camera.strength - camera.strength;
    var randy = Math.random() * 2 * camera.strength - camera.strength;
    camera.acel.x += randx;
    camera.acel.y += randy;
    camera.strength -= camera.damper;
  }

  // camera drag
  camera.ppos.x = camera.cpos.x + (camera.ppos.x - camera.cpos.x) * 0.3;
  camera.ppos.y = camera.cpos.y + (camera.ppos.y - camera.cpos.y) * 0.3;

  // camera verlet
  camera.cpos.x += camera.acel.x * 0.256;
  camera.cpos.y += camera.acel.y * 0.256;
  var cx = 2 * camera.cpos.x - camera.ppos.x;
  var cy = 2 * camera.cpos.y - camera.ppos.y;
  camera.ppos.x = camera.cpos.x;
  camera.ppos.y = camera.cpos.y;
  camera.cpos.x = cx;
  camera.cpos.y = cy;
  camera.acel.x = 0;
  camera.acel.y = 0;

  // bind camera to world edges
  if (camera.bound) {

    // flush camera -- x bounds
    camera.cpos.x = Math.min(camera.cpos.x, camera.maxWidth - camera.width);
    camera.cpos.x = Math.max(camera.cpos.x, 0);

    // flush camera -- y bounds
    camera.cpos.y = Math.min(camera.cpos.y, camera.maxHeight - camera.height);
    camera.cpos.y = Math.max(camera.cpos.y, 0);
  }

  // draw player with corrected positions
  var playerx = player.cpos.x - camera.cpos.x;
  var playery = player.cpos.y - camera.cpos.y;
  context.beginPath();
  context.fillStyle = "white";
  context.fillRect(playerx, playery, 10, 10);

  // draw entities with corrected positions
  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var ex = entity.cpos.x - camera.cpos.x;
    var ey = entity.cpos.y - camera.cpos.y;
    if ((ex >= -camera.cullDist && ex <= camera.width + camera.cullDist) &&
        (ey >= -camera.cullDist && ex <= camera.height + camera.cullDist) ) {
      context.beginPath();
      context.fillStyle="gold";
      context.arc(ex,ey, 10, 0, 2*Math.PI, false);
      context.fill();
    }
  }
}


// start everything and handle stopping
anim = requestAnimationFrame(update);
document.addEventListener("keydown", function(ev) {
  if (ev.keyCode === 27) {
    cancelAnimationFrame(anim);
  }
});
