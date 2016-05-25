/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(4);
	// var Player = require('./player.js');
	// var Camera = require('./camera.js');
	
	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext('2d');
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Camera = __webpack_require__(3);
	
	var Game = function (context) {
	  this.context = context;
	  this.height = document.body.clientHeight;
	  this.width = document.body.clientWidth;
	  this.camera = new Camera(this.height, this.width); //replace these values
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Player = function (context) {
	  this.cpos = { x: 0, y: 0 }; // camera position vector
	  this.ppos = { x: 0, y: 0 };
	  this.acel = { x: 0, y: 0 }; // gravity
	  this.context = context;
	};
	
	Player.prototype.render = function (xPos, yPos) {
	  this.context.beginPath();
	  this.context.fillStyle = "white";
	  this.context.fillRect(xPos, yPos, 10, 10);
	};
	
	Player.prototype.impulse = function (axis, direction) {
	  if (direction === 'pos') {
	    direction = 1;
	  } else {
	    direction = -1;
	  }
	
	  if (axis === "x") {
	    this.acel.x = direction * 6;
	  } else {
	    this.acel.y = direction * 6;
	  }
	};
	
	Player.prototype.move = function () {
	  // player drag
	  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.93;
	  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.93;
	
	  // player verlet
	  this.cpos.x += this.acel.x * 0.256;
	  this.cpos.y += this.acel.y * 0.256;
	  var px = 2 * this.cpos.x - this.ppos.x;
	  var py = 2 * this.cpos.y - this.ppos.y;
	  this.ppos.x = this.cpos.x;
	  this.ppos.y = this.cpos.y;
	  this.cpos.x = px;
	  this.cpos.y = py;
	  this.acel.x = 0;
	  this.acel.y = 0;
	};
	
	module.exports = Player;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Camera = function (height, width) {
	  this.cpos = { x: 0, y: 0 }; // top left corner of camera object
	  this.ppos = { x: 0, y: 0 }; // location of player object
	  this.acel = { x: 0, y: 0 }; // acceleration of camera object
	  this.height = height;
	  this.width  = width;
	  this.maxHeight = 6 * height;
	  this.maxWidth = 6 * width;
	  this.cullDistX = [0, width];  // "cull" distance. or, objects this far away from cam not rendered
	  this.cullDistY = [0, height];
	  this.bound = true;
	  this.target = { x: 0, y: 0 };
	  this.strength = 0;
	  this.damper = 0;
	};
	
	Camera.prototype.squashCamera = function() {
	  this.height -= 10;
	  this.cullDistY[0] += 10;
	  this.cullDistY[1] -= 10;
	};
	
	Camera.prototype.screenShake = function() {
	  this.strength = 90;
	  this.damper = 5;
	};
	
	Camera.prototype.move = function (playerCPosX, playerCPosY) {
	  // get the target point
	  this.target.x = playerCPosX - (this.width / 2);
	  this.target.y = playerCPosY - (this.height / 2);
	
	  // move this towards target point
	  this.acel.x += (1 / 8) * (this.target.x - this.cpos.x);
	  this.acel.y += (1 / 8) * (this.target.y - this.cpos.y);
	
	  // camera shake update
	  if (this.strength > 0) {
	    var randx = Math.random() * 2 * this.strength - this.strength;
	    var randy = Math.random() * 2 * this.strength - this.strength;
	    this.acel.x += randx;
	    this.acel.y += randy;
	    this.strength -= this.damper;
	  }
	
	  // camera drag
	  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.3;
	  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.3;
	
	  // camera verlet
	  this.cpos.x += this.acel.x * 0.256;
	  this.cpos.y += this.acel.y * 0.256;
	  var cx = 2 * this.cpos.x - this.ppos.x;
	  var cy = 2 * this.cpos.y - this.ppos.y;
	  this.ppos.x = this.cpos.x;
	  this.ppos.y = this.cpos.y;
	  this.cpos.x = cx;
	  this.cpos.y = cy;
	  this.acel.x = 0;
	  this.acel.y = 0;
	
	  // bind camera to world edges
	  if (this.bound) {
	
	    // flush camera -- x bounds
	    this.cpos.x = Math.min(this.cpos.x, this.maxWidth - this.width);
	    this.cpos.x = Math.max(this.cpos.x, 0);
	
	    // flush camera -- y bounds
	    this.cpos.y = Math.min(this.cpos.y, this.maxHeight - this.height);
	    this.cpos.y = Math.max(this.cpos.y, 0);
	  }
	};
	
	module.exports = Camera;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var GameView = function (game, context) {
	  this.context = context;
	  this.game = game;
	  this.inputs = {};
	  this.entities = [];
	
	  this.initiateEntities();
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	
	  document.body.addEventListener("keydown", function(e) {
	    this.inputs[e.keyCode] = true;
	  }.bind(this));
	
	  document.body.addEventListener("keyup", function(e) {
	    this.inputs[e.keyCode] = false;
	  }.bind(this));
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	
	  //start the animation
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.animate = function() {
	  this.keyCheck();
	
	  this.game.camera.move(this.game.player.cpos.x, this.game.player.cpos.y);
	  this.game.player.move();
	
	  this.clearBlack();
	
	
	  // draw this.game.player with corrected positions
	  var playerX = this.game.player.cpos.x - this.game.camera.cpos.x;
	  var playerY = this.game.player.cpos.y - this.game.camera.cpos.y;
	  this.game.player.render(playerX, playerY);
	
	  // draw entities with corrected positions
	  this.drawEntities();
	
	  //every call to animate requests causes another call to animate
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.keyCheck = function () {
	  // check inputs
	  // jump - w
	  if (this.inputs[87]) {
	    this.game.player.impulse('y', 'neg');
	  }
	
	  // down - s
	  else if (this.inputs[83]) {
	    this.game.player.impulse('y', 'pos');
	  }
	
	  // left - a
	  if (this.inputs[65]) {
	    this.game.player.impulse('x', 'neg');
	  }
	
	  // right - d
	  else if (this.inputs[68]) {
	    this.game.player.impulse('x', 'pos');
	  }
	
	  // shift - screen shake
	  if (this.inputs[16]) {
	    this.game.camera.screenShake();
	  }
	
	  // space - screen squash
	  if (this.inputs[32]) {
	    this.game.camera.squashCamera();
	  }
	};
	
	GameView.prototype.initiateEntities = function () {
	  for (var i = 0; i < 200; i++) {
	    var randx = Math.random() * 6 * document.body.clientWidth;
	    var randy = Math.random() * 6 * document.body.clientHeight;
	    this.entities.push({
	      cpos : { x : randx, y : randy },
	      ppos : { x : randx, y : randy },
	      acel : { x: 0, y : 0 }
	    });
	  }
	};
	
	GameView.prototype.clearBlack = function () {
	  var canvas = document.getElementById("canvas");
	  var context = this.context;
	  var camera = this.game.camera;
	
	  context.beginPath();
	  if (camera.height < canvas.height) {
	    context.fillStyle = "white";
	    context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
	    context.fillStyle = "black";
	    context.fillRect(0, canvas.height - camera.height, canvas.width, camera.height);
	    context.fillStyle = "white";
	    context.fillRect(0, camera.height, canvas.width, window.innerHeight);
	  } else {
	    context.fillStyle = "black";
	    context.fillRect(0, 0, canvas.width, canvas.height);
	  }
	};
	
	GameView.prototype.drawEntities = function () {
	  for (var i = 0; i < this.entities.length; i++) {
	    var entity = this.entities[i];
	    var entityX = entity.cpos.x - this.game.camera.cpos.x;
	    var entityY = entity.cpos.y - this.game.camera.cpos.y;
	    if ((entityX >= this.game.camera.cullDistX[0] && entityX <= this.game.camera.cullDistX[1]) &&
	        (entityY >= this.game.camera.cullDistY[0] && entityY <= this.game.camera.cullDistY[1]) ) {
	      this.context.beginPath();
	      this.context.fillStyle="gold";
	      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
	      this.context.fill();
	    }
	  }
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map