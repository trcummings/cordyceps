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
	
	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext('2d');
	
	  canvas.width = 3 * document.body.clientWidth / 4;
	  canvas.height = 3 * document.body.clientHeight / 4;
	
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Camera = __webpack_require__(3);
	var canvas = document.getElementById("canvas");
	
	var Game = function (context) {
	  this.context = context;
	  this.height = canvas.height;
	  this.width = canvas.width;
	  this.camera = new Camera(this.height, this.width); //replace these values
	  this.player = new Player(context);
	  this.entities = [];
	  this.boxes = [];
	
	  this.initiateBoxes();
	  this.initiateEntities();
	};
	
	Game.prototype.render = function(player, camera) {
	  this.camera.move(this.player.cpos.x, this.player.cpos.y);
	  this.player.move();
	
	  this.clearBlack();
	
	  // draw this.player with corrected positions
	  var playerX = this.player.cpos.x - this.camera.cpos.x;
	  var playerY = this.player.cpos.y - this.camera.cpos.y;
	  this.player.render(playerX, playerY);
	
	  this.drawBoxes();
	  this.drawEntities();
	};
	
	Game.prototype.clearBlack = function () {
	  var canvas = document.getElementById("canvas");
	  var context = this.context;
	  var camera = this.camera;
	
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
	
	Game.prototype.initiateEntities = function () {
	  for (var i = 0; i < 2000; i++) {
	    var randx = Math.random() * 6 * this.width;
	    var randy = Math.random() * 6 * this.height;
	    this.entities.push({
	      cpos : { x : randx, y : randy },
	      ppos : { x : randx, y : randy },
	      acel : { x: 0, y : 0 }
	    });
	  }
	};
	
	Game.prototype.drawEntities = function () {
	  for (var i = 0; i < this.entities.length; i++) {
	    var entity = this.entities[i];
	    var entityX = entity.cpos.x - this.camera.cpos.x;
	    var entityY = entity.cpos.y - this.camera.cpos.y;
	    if ((entityX >= this.camera.cullDistX[0] && entityX <= this.camera.cullDistX[1]) &&
	        (entityY >= this.camera.cullDistY[0] && entityY <= this.camera.cullDistY[1]) ) {
	      this.context.beginPath();
	      this.context.fillStyle="gold";
	      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
	      this.context.fill();
	    }
	  }
	};
	
	Game.prototype.initiateBoxes = function () {
	  // dimensions
	  // left box
	  this.boxes.push({
	    cpos : { x : 0, y : 0 },
	    ppos : { x : 0, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: 40,
	    height: 6 * this.height
	  });
	
	  // right box
	  this.boxes.push({
	    cpos : { x : 6 * this.width - 10, y : 0 },
	    ppos : { x : 6 * this.width - 10, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 6 * this.height
	  });
	
	  // top box
	  this.boxes.push({
	    cpos : { x : 0, y : 0 },
	    ppos : { x : 0, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: 6 * this.width,
	    height: 40,
	  });
	
	  // bottom box
	  this.boxes.push({
	    cpos : { x : 0, y : 6 * this.height - 10 },
	    ppos : { x : 0, y : 6 * this.height - 10 },
	    acel : { x: 0, y : 0 },
	    width: 6 * this.width,
	    height: 40,
	  });
	
	  this.boxes.push({
	    cpos : { x : 220, y : 50 },
	    ppos : { x : 220, y : 50 },
	    acel : { x: 0, y : 0 },
	    width: 80,
	    height: 80
	  });
	};
	
	Game.prototype.drawBoxes = function () {
	  for (var i = 0; i < this.boxes.length; i++) {
	    var box = this.boxes[i];
	    var boxX = box.cpos.x - this.camera.cpos.x;
	    var boxY = box.cpos.y - this.camera.cpos.y;
	    if ((boxX >= this.camera.cullDistX[0] && boxX <= this.camera.cullDistX[1]) &&
	        (boxY >= this.camera.cullDistY[0] && boxY <= this.camera.cullDistY[1]) ) {
	      this.context.fillStyle = "green";
	      this.context.beginPath();
	      this.context.fillRect(boxX, boxY, box.width, box.height);
	    }
	
	      // var dir = colCheck(player, boxes[i]);
	      //
	      // if (dir === "l" || dir === "r") {
	      //     player.velX = 0;
	      //     player.jumping = false;
	      // } else if (dir === "b") {
	      //     player.grounded = true;
	      //     player.jumping = false;
	      // } else if (dir === "t") {
	      //     player.velY *= -1;
	      // }
	  }
	};
	
	// Collision checking
	// function colCheck(shapeA, shapeB) {
	//     // get the vectors to check against
	//     var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
	//         vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
	//         // add the half widths and half heights of the objects
	//         hWidths = (shapeA.width / 2) + (shapeB.width / 2),
	//         hHeights = (shapeA.height / 2) + (shapeB.height / 2),
	//         colDir = null;
	//
	//     // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
	//     if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	//         // figures out on which side we are colliding (top, bottom, left, or right)
	//         var oX = hWidths - Math.abs(vX),
	//             oY = hHeights - Math.abs(vY);
	//         if (oX >= oY) {
	//             if (vY > 0) {
	//                 colDir = "t";
	//                 shapeA.y += oY;
	//             } else {
	//                 colDir = "b";
	//                 shapeA.y -= oY;
	//             }
	//         } else {
	//             if (vX > 0) {
	//                 colDir = "l";
	//                 shapeA.x += oX;
	//             } else {
	//                 colDir = "r";
	//                 shapeA.x -= oX;
	//             }
	//         }
	//     }
	//     return colDir;
	// }
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(5);
	
	var Player = function (context) {
	  this.cpos = { x: 70, y: 70 }; // camera position vector center
	  this.ppos = { x: 70, y: 70 }; // player position center
	  this.acel = { x: 0, y: 0 }; // gravity
	  this.context = context;
	
	  // this.AABB = {
	  //   tl: [this.cpos.x - 10, this.cpos.y - 10],
	  //   tr: [this.cpos.x + 10, this.cpos.y - 10],
	  //   bl: [this.cpos.x - 10, this.cpos.y + 10],
	  //   br: [this.cpos.x + 10, this.cpos.y + 10]
	  // };
	
	  this.grounded = false;
	  this.jumping = false;
	};
	
	Player.prototype.render = function (xPos, yPos) {
	  this.context.beginPath();
	  this.context.fillStyle = "white";
	  this.context.fillRect(
	    xPos,
	    yPos,
	    20,
	    20
	  );
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
	
	  // player verlet integration
	  Util.verletTransform(this);
	
	
	  // Grounding checks
	  // if (!player.jumping && player.grounded) {
	  //     player.jumping = true;
	  //     player.grounded = false;
	  //     player.velY = -player.speed * 2;
	  // }
	  //
	  // player.grounded = false;
	  // for (var i = 0; i < boxes.length; i++) {
	  //     ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
	  //
	  //     var dir = colCheck(player, boxes[i]);
	  //
	  //     if (dir === "l" || dir === "r") {
	  //         player.velX = 0;
	  //         player.jumping = false;
	  //     } else if (dir === "b") {
	  //         player.grounded = true;
	  //         player.jumping = false;
	  //     } else if (dir === "t") {
	  //         player.velY *= -1;
	  //     }
	  //
	  // }
	  //
	  // if(player.grounded){
	  //      player.velY = 0;
	  // }
	
	};
	
	module.exports = Player;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(5);
	
	var Camera = function (height, width) {
	  this.cpos = { x: 0, y: 0 }; // "current pos" top left corner of camera object
	  this.ppos = { x: 0, y: 0 }; // "past pos"
	  this.acel = { x: 0, y: 0 }; // acceleration of camera object
	  this.height = height; // camera height
	  this.width  = width; // camera width
	  this.target = { x: 0, y: 0 }; // target position
	
	  // for drawing camera and binding it to world space
	  this.maxHeight = 6 * height;
	  this.maxWidth = 6 * width;
	  this.cullDistX = [0, width];  // "cull" distance. or, objects this far away from cam not rendered
	  this.cullDistY = [0, height];
	  this.bound = true;
	
	  // for screenshake
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
	  this.target.x = playerCPosX - (this.width / 2); //sets target x to center of screen relative to player
	  this.target.y = playerCPosY - (this.height / 2); // same but with y
	
	  // move camera towards target point
	  this.acel.x += (1 / 8) * (this.target.x - this.cpos.x); // acceleration vector
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
	  Util.verletTransform(this);
	
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
	};
	
	GameView.prototype.start = function () {
	  this.bindKeyHandlers();
	
	  //start the animation
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.bindKeyHandlers = function () {
	  document.body.addEventListener("keydown", function(e) {
	    this.inputs[e.keyCode] = true;
	  }.bind(this));
	
	  document.body.addEventListener("keyup", function(e) {
	    this.inputs[e.keyCode] = false;
	  }.bind(this));
	};
	
	GameView.prototype.animate = function() {
	  this.keyCheck();
	  this.game.render();
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
	
	module.exports = GameView;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Util = {
	  inherits: function (ChildClass, ParentClass) {
	    var Surrogate = function () {};
	    Surrogate.prototype = ParentClass.prototype;
	    ChildClass.prototype = new Surrogate();
	    ChildClass.prototype.constructor = ChildClass;
	  },
	
	  dist: function (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  scale: function (vector, magnitude) {
	    return [vector[0] * magnitude, vector[1] * magnitude];
	  },
	
	  verletTransform: function (obj) {
	    obj.cpos.x += obj.acel.x * 0.256;
	    obj.cpos.y += obj.acel.y * 0.256;
	
	    var dx = 2 * obj.cpos.x - obj.ppos.x;
	    var dy = 2 * obj.cpos.y - obj.ppos.y;
	    
	    obj.ppos.x = obj.cpos.x;
	    obj.ppos.y = obj.cpos.y;
	
	    obj.cpos.x = dx;
	    obj.cpos.y = dy;
	
	    obj.acel.x = 0;
	    obj.acel.y = 0;
	  }
	  //
	  // vectorAngle: function(vector, objectPos) {
	  //   var hypotenuse = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
	  // }
	};
	
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map