var Player = require('./player.js');
var Camera = require('./camera.js');

var Game = function (context) {
  this.context = context;
  this.camera = new Camera(document.body.clientHeight, document.body.clientWidth); //replace these values
  this.player = new Player(context);
};

module.exports = Game;

// Game.BG_COLOR = "#000000";
// Game.DIM_X = 1000;
// Game.DIM_Y = 600;
// Game.FPS = 32;
//
// Game.prototype.allObjects = function () {
//   return [].concat([] /* types of objects go here maybe */);
// };
//
// Game.prototype.checkCollisions = function () {
// };
//
// Game.prototype.draw = function (context) {
//   context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
//   context.fillStyle = Game.BG_COLOR;
//   context.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
//
//   // this.allObjects().forEach(function (object) {
//   //   object.draw(context);
//   // });
// };
//
// Game.prototype.isOutOfBounds = function (pos) {
//   return (pos[0] < 0) || (pos[1] < 0) ||
//     (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
// };
//
// Game.prototype.moveObjects = function (delta) {
//   this.allObjects().forEach(function (object) {
//     object.move(delta);
//   });
// };
//
// Game.prototype.randomPosition = function () {
//   return [
//     Game.DIM_X * Math.random(),
//     Game.DIM_Y * Math.random()
//   ];
// };
//
// Game.prototype.remove = function (object) {
//   // if (object instanceof Bullet) {
//   //   this.bullets.splice(this.bullets.indexOf(object), 1);
//   // } else if (object instanceof Asteroid) {
//   //   var idx = this.asteroids.indexOf(object);
//   //   this.asteroids[idx] = new Asteroid({ game: this });
//   // } else if (object instanceof Ship) {
//   //   this.ships.splice(this.ships.indexOf(object), 1);
//   // } else {
//   //   throw "wtf?";
//   // }
// };
//
// Game.prototype.step = function (delta) {
//   this.moveObjects(delta);
//   this.checkCollisions();
// };
//
// Game.prototype.screenShake = function () {
//   console.log("its fuckin on now lads");
// };
