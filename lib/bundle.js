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
	var GameView = __webpack_require__(6);
	
	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext('2d');
	
	  canvas.width = 3 * document.body.clientWidth / 4;
	  canvas.height = 3 * document.body.clientHeight / 4;
	
	  var game = new Game(context);
	  new GameView(game, context).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Camera = __webpack_require__(4);
	var Util = __webpack_require__(3);
	var TempWorld = __webpack_require__(5);
	var canvas = document.getElementById("canvas");
	
	var Game = function (context) {
	  this.context = context;
	  this.world = new TempWorld();
	  this.height = this.world.height;
	  this.width = this.world.width;
	  this.camera = new Camera(canvas.height, canvas.width, this.world); //replace these values
	  this.player = new Player(context, 50, this.world.height - 50);
	  this.entities = [];
	
	  this.initiateEntities();
	};
	
	Game.prototype.step = function() {
	  this.moveObjects();
	  this.checkAllCollisions();
	  this.render();
	};
	
	Game.prototype.moveObjects = function () {
	  this.camera.move(this.player);
	  this.player.move();
	};
	
	Game.prototype.render = function() {
	  this.clearBlack();
	
	  // draw this.player with corrected positions
	  var playerX = this.player.pos.x - this.camera.cpos.x;
	  var playerY = this.player.pos.y - this.camera.cpos.y;
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
	    // context.fillStyle = "white";
	    // context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
	    // context.fillStyle = "black";
	    // context.fillRect(0, canvas.height - camera.height, canvas.width, camera.height);
	    // context.fillStyle = "white";
	    // context.fillRect(0, camera.height, canvas.width, window.innerHeight);
	  } else {
	    var grad = context.createLinearGradient(0, 0, this.player.pos.x/3, 0);
	      grad.addColorStop(0, "white");
	      grad.addColorStop(0.5, "red");
	      grad.addColorStop(1, "black");
	    context.fillStyle = grad;
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
	    if ((entityX >= this.camera.cullDistX.left && entityX <= this.camera.cullDistX.right) &&
	        (entityY >= this.camera.cullDistY.top && entityY <= this.camera.cullDistY.bottom) ) {
	      this.context.beginPath();
	      this.context.fillStyle="gold";
	      this.context.arc(entityX,entityY, 10, 0, 2*Math.PI, false);
	      this.context.fill();
	    }
	  }
	};
	
	Game.prototype.drawBoxes = function () {
	  for (var i = 0; i < this.world.boxes.length; i++) {
	    var box = this.world.boxes[i];
	    var boxX = box.cpos.x - this.camera.cpos.x;
	    var boxY = box.cpos.y - this.camera.cpos.y;
	    // if ((boxX >= this.camera.cullDistX.left && boxX <= this.camera.cullDistX.right) &&
	        // (boxY >= this.camera.cullDistY.top && boxY <= this.camera.cullDistY.bottom) ) {
	      this.context.fillStyle = "green";
	      this.context.beginPath();
	      this.context.fillRect(boxX, boxY, box.width, box.height);
	    // }
	  }
	};
	
	Game.prototype.checkAllCollisions = function () {
	  this.player.grounded = false;
	
	  for (var i = 0; i < this.world.boxes.length; i++) {
	    var box = this.world.boxes[i];
	
	    var dir = this.collisionCheck(this.player, box);
	
	    this.player.collision(box, dir);
	  }
	
	  this.world.triggers.forEach(function (trigger) {
	    dir = this.collisionCheck(this.player, trigger);
	    if (dir) {
	      trigger.activate();
	    }
	  }.bind(this));
	};
	
	Game.prototype.collisionCheck = function (player, obj2) {
	    // get the vectors to check against
	    var vX = (player.pos.x + (player.width / 2)) - (obj2.cpos.x + (obj2.width / 2)),
	        vY = (player.pos.y + (player.height / 2)) - (obj2.cpos.y + (obj2.height / 2)),
	        // add the half widths and half heights of the objects
	        halfWidths = (player.width / 2) + (obj2.width / 2),
	        halfHeights = (player.height / 2) + (obj2.height / 2),
	        colDir = null;
	
	    // if the x and y vector are less than the half width or half height, then we must be inside the object, causing a collision
	    if (Math.abs(vX) < halfWidths && Math.abs(vY) < halfHeights) {
	        // figures out on which side we are colliding (top, bottom, left, or right)
	        var oX = halfWidths - Math.abs(vX),
	            oY = halfHeights - Math.abs(vY);
	        if (oX >= oY) {
	          if (vY > 0) {
	            colDir = "t";
	            player.pos.y += oY;
	          } else {
	            colDir = "b";
	            player.pos.y -= oY;
	          }
	        } else {
	          if (vX > 0) {
	            colDir = "l";
	            player.pos.x += oX;
	          } else {
	            colDir = "r";
	            player.pos.x -= oX;
	          }
	        }
	      // RETURN OX AND OY HERE
	    }
	    return colDir;
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var Box = __webpack_require__(7);
	
	var Player = function (context, startX, startY) {
	  this.pos = { x: startX, y: startY };
	  this.context = context;
	  this.height = 20;
	  this.width = 20;
	  this.velocity = { x: 0, y: 0 };
	
	  this.grounded = false;
	  this.jumping = false;
	  this.facing = "r";
	
	  var image = new Image();
	  image.src = 'http://www.learnjquery.org/newsletter/sonic.png';
	
	  this.sprite = {
	    img: image,
	    frameIdx: 0,
	    numFrames: 8,
	    height: 100,
	    width: 800
	  };
	};
	
	Player.prototype.render = function (xPos, yPos) {
	  // img	Source image object	Sprite sheet
	  // sx	Source x	Frame index times frame width
	  // sy	Source y	0
	  // sw	Source width	Frame width
	  // sh	Source height	Frame height
	  // dx	Destination x	0
	  // dy	Destination y	0
	  // dw	Destination width	Frame width
	  // dh	Destination height	Frame height
	  // debugger;
	
	  // this.context.drawImage(
	  //   this.sprite.img,
	  //   this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
	  //   0,
	  //   this.sprite.width / this.sprite.numFrames,
	  //   this.sprite.height,
	  //   xPos,
	  //   yPos - this.sprite.height,
	  //   this.sprite.width / this.sprite.numFrames,
	  //   this.sprite.height
	  // );
	  //
	  // if (this.velocity.x !== 0) {
	  //   this.sprite.frameIdx++;
	  //   if (this.sprite.frameIdx > this.sprite.numFrames) {
	  //     this.sprite.frameIdx = 0;
	  //   }
	  // } else {
	  //   this.sprite.frameIdx = 0;
	  // }
	  this.context.beginPath();
	  this.context.fillStyle = "white";
	  this.context.fillRect(
	    xPos,
	    yPos,
	    20,
	    20
	  );
	};
	
	Player.prototype.impulse = function (dir) {
	  if (dir > 0 ) {
	    this.facing = "r";
	    this.velocity.x++;
	
	  } else if (dir < 0) {
	    this.facing = "l";
	    this.velocity.x--;
	  }
	};
	
	Player.prototype.jump = function () {
	  if (!this.jumping && this.grounded) {
	      this.jumping = true;
	      this.grounded = false;
	      this.velocity.y = -25;
	  }
	};
	
	Player.prototype.move = function () {
	
	  if(this.grounded) {
	    this.velocity.y = 0;
	  }
	
	  this.pos.x += this.velocity.x;
	  this.pos.y += this.velocity.y;
	
	  // friction
	  this.velocity.x *= 0.90;
	
	  // gravity
	  this.velocity.y += 0.80;
	};
	
	Player.prototype.collision = function (object, dir) {
	
	  if(object instanceof Box) {
	    this.boxCollision(dir);
	  } else {
	    console.log("hit a trigger");
	  }
	};
	
	Player.prototype.boxCollision = function (dir) {
	
	  if (dir === "l") {
	    this.velocity.x = 0;
	
	  } else if (dir === "r") {
	    this.velocity.x = 0;
	
	  } else if (dir === "b") {
	    this.grounded = true;
	    this.jumping = false;
	
	  } else if (dir === "t") {
	    this.velocity.y *= -1;
	  }
	};
	
	module.exports = Player;


/***/ },
/* 3 */
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	
	var Camera = function (height, width, world) {
	  this.world = world;
	  this.cpos = { x: 50, y: world.height - 50 }; // "current pos" top left corner of camera object
	  this.ppos = { x: 50, y: world.height - 50 }; // "past pos"
	  this.acel = { x: 0, y: 0 }; // acceleration of camera object
	  this.height = height; // camera height
	  this.width  = width; // camera width
	  this.target = { x: 0, y: 0 }; // target position
	
	  // for drawing camera and binding it to world space
	  this.maxHeight = this.world.height;
	  this.maxWidth = this.world.width;
	  this.cullDistX = {left: 0, right: width};  // "cull" distance. or, objects this far away from cam not rendered
	  this.cullDistY = {top: 0, bottom: height};
	  this.bound = true;
	
	  // for screenshake
	  this.strength = 0;
	  this.damper = 0;
	};
	
	Camera.prototype.squashCamera = function() {
	  this.height -= 10;
	  this.cullDistY.top += 10;
	  this.cullDistY.bottom -= 10;
	};
	
	Camera.prototype.screenShake = function() {
	  this.strength = 90;
	  this.damper = 5;
	};
	
	Camera.prototype.move = function (targetObj) {
	  // get the target point
	  if (targetObj.facing === "r") {
	    this.target.x = targetObj.pos.x + 500 - (this.width / 2); //sets target x to center of screen relative to player
	  } else {
	    this.target.x = targetObj.pos.x - 500 - (this.width / 2);
	  }
	  this.target.y = targetObj.pos.y - (this.height / 2); // same but with y
	
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(7);
	
	var TempWorld = function () {
	  this.height = 2000;
	  this.width = 6000;
	  this.boxes = [];
	  this.triggers = [];
	
	  this.initiateBoxes();
	  this.initiateTriggers();
	};
	
	TempWorld.prototype.initiateBoxes = function () {
	  // left box
	  this.boxes.push(new Box({
	    cpos : { x : 0, y : 0 },
	    ppos : { x : 0, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: 40,
	    height: this.height
	  }));
	
	  // right box
	  this.boxes.push(new Box({
	    cpos : { x : this.width - 10, y : 0 },
	    ppos : { x : this.width - 10, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 6 * this.height
	  }));
	
	  // top box
	  this.boxes.push(new Box({
	    cpos : { x : 0, y : 0 },
	    ppos : { x : 0, y : 0 },
	    acel : { x: 0, y : 0 },
	    width: this.width,
	    height: 40,
	  }));
	
	  // bottom box
	  this.boxes.push(new Box({
	    cpos : { x : 0, y : this.height - 10 },
	    ppos : { x : 0, y : this.height - 10 },
	    acel : { x: 0, y : 0 },
	    width: this.width,
	    height: 40,
	  }));
	
	  // 1st platform
	  this.boxes.push(new Box({
	    cpos : { x : 300, y : this.height - 70 },
	    ppos : { x : 300, y : this.height - 70 },
	    acel : { x: 0, y : 0 },
	    width: 300,
	    height: 10,
	  }));
	
	  this.boxes.push(new Box({
	    cpos : { x : 220, y : 50 },
	    ppos : { x : 220, y : 50 },
	    acel : { x: 0, y : 0 },
	    width: 80,
	    height: 80
	  }));
	};
	
	TempWorld.prototype.initiateTriggers = function () {
	  this.triggers.push({
	    cpos : { x : 800, y : this.height - 70 },
	    ppos : { x : 800, y : this.height - 70 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 50,
	    activate: function () {
	      console.log('BOX ACTIVATED');
	    }
	  });
	};
	
	module.exports = TempWorld;


/***/ },
/* 6 */
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
	  this.game.step();
	  requestAnimationFrame(this.animate.bind(this));
	};
	
	GameView.prototype.keyCheck = function () {
	  // check inputs
	  // jump - w
	  if (this.inputs[87]) {
	    this.game.player.jump();
	  }
	
	  // // down - s
	  // else if (this.inputs[83]) {
	  //   this.game.player.impulse('y', 'pos');
	  // }
	
	  // left - a
	  if (this.inputs[65]) {
	    this.game.player.impulse(-1);
	  }
	
	  // right - d
	  else if (this.inputs[68]) {
	    this.game.player.impulse(1);
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
/* 7 */
/***/ function(module, exports) {

	var Box = function (options) {
	    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
	    this.ppos = { x: options.ppos.x, y: options.ppos.y};
	    this.acel = { x: options.acel.x, y: options.acel.y};
	    this.width = options.width;
	    this.height = options.height;
	};
	
	module.exports = Box;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map