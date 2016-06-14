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
	var GameView = __webpack_require__(10);
	
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
	var Camera = __webpack_require__(6);
	var Util = __webpack_require__(3);
	var TempWorld = __webpack_require__(7);
	var canvas = document.getElementById("canvas");
	var Trigger = __webpack_require__(8);
	var Ramp = __webpack_require__(5);
	
	
	var Game = function (context) {
	  this.context = context;
	  this.world = new TempWorld(this);
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
	  this.drawOverlays();
	  this.drawRamps();
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
	
	Game.prototype.drawRamps = function () {
	  for (var i = 0; i < this.world.ramps.length; i++) {
	    var ramp = this.world.ramps[i];
	    ramp.rampX = ramp.cpos.x - this.camera.cpos.x;
	    ramp.rampY = ramp.cpos.y - this.camera.cpos.y;
	    // if ((rampX >= this.camera.cullDistX.left && rampX <= this.camera.cullDistX.right) &&
	        // (rampY >= this.camera.cullDistY.top && rampY <= this.camera.cullDistY.bottom) ) {
	    ramp.draw(this.context);
	    // }
	  }
	};
	
	Game.prototype.drawOverlays = function () {
	  var overlays = this.world.textOverlays;
	
	  if (overlays.length > 0) {
	    // debugger;
	    overlays.forEach(function (overlay, index) {
	      if (index === 0) {
	        overlay.draw(this.context, this.camera.width/10, 2*this.camera.height/3);
	      } else if (overlays[index - 1] && (overlays[index - 1].message !== overlay.message)) {
	        overlay.draw(this.context, this.camera.width/10, 2*this.camera.height/3);
	        if (overlay.alpha < 0) {
	          overlays.splice(index, 1);
	        }
	      }
	      // overlay.draw(this.context, this.player.pos.x, this.player.pos.y - 45);
	    }.bind(this));
	  }
	};
	
	Game.prototype.checkAllCollisions = function () {
	  this.player.grounded = false;
	
	  for (var i = 0; i < this.world.boxes.length; i++) {
	    var box = this.world.boxes[i];
	
	    var dir = this.collisionCheck(this.player, box);
	
	    this.player.collision(box, dir);
	  }
	
	  for (var j = 0; j < this.world.ramps.length; j++) {
	    var ramp = this.world.ramps[j];
	    var dir2 = this.collisionCheck(this.player, ramp);
	
	    if (dir2) {
	      console.log("ramp collision!");
	      this.player.collision(ramp, dir2);
	    }
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
	            oY = halfHeights - Math.abs(vY),
	            bumpValue;
	
	        if (obj2 instanceof Trigger) {
	          bumpValue = 0;
	        } else if (obj2 instanceof Ramp) {
	          bumpValue = 0;
	        } else {
	          bumpValue = 1;
	        }
	
	        if (oX >= oY) {
	          if (vY > 0) {
	            colDir = "t";
	            player.pos.y += oY * bumpValue;
	          } else {
	            colDir = "b";
	            player.pos.y -= oY * bumpValue;
	          }
	        } else {
	          if (vX > 0) {
	            colDir = "l";
	            player.pos.x += oX * bumpValue;
	          } else {
	            colDir = "r";
	            player.pos.x -= oX * bumpValue;
	          }
	        }
	    }
	    return colDir;
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var Box = __webpack_require__(4);
	var Ramp = __webpack_require__(5);
	
	var Player = function (context, startX, startY) {
	  this.pos = { x: startX, y: startY };
	  this.context = context;
	  this.height = 20;
	  this.width = 20;
	  this.velocity = { x: 0, y: 0 };
	
	  this.grounded = false;
	  this.jumping = false;
	  this.facing = "r";
	
	  this.gravity = 0.80;
	
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
	
	  if (this.facing == "r") {
	    this.sprite.img.src = 'lib/sprites/spriteImages.js/sonic-sprite-right.png';
	  } else {
	    this.sprite.img.src = 'lib/sprites/spriteImages.js/sonic-sprite-left.png';
	  }
	
	  if(!this.interval) {
	    this.interval = window.setInterval(function () {
	      if (!this.jumping && (this.velocity.x > 2 || this.velocity.x < -2)) {
	        if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
	          this.sprite.frameIdx = 0;
	        }
	        this.sprite.frameIdx++;
	      } else {
	        this.sprite.frameIdx = 7;
	      }
	    }.bind(this), 80);
	  }
	
	  this.context.drawImage(
	    this.sprite.img,
	    this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
	    0,
	    this.sprite.width / this.sprite.numFrames,
	    this.sprite.height,
	    xPos - this.width - 5,
	    yPos - this.sprite.height + this.height + 10,
	    this.sprite.width / this.sprite.numFrames,
	    this.sprite.height
	  );
	
	};
	
	Player.prototype.impulse = function (dir) {
	  if (dir > 0) {
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
	  this.velocity.y += this.gravity;
	};
	
	Player.prototype.collision = function (object, dir) {
	
	  if(object instanceof Box) {
	    this.boxCollision(dir);
	  } else if (object instanceof Ramp) {
	    this.rampCollision(object, dir);
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
	
	Player.prototype.rampCollision = function (ramp, dir) {
	  // add checks for which type but for now just do bl-tr
	  // write algorithm for smooth ascent based on start to end position maybe
	
	  // this.pos.y -= 2 * ramp.width/ramp.cpos.x;
	  // debugger;
	
	  if (dir === "l") {
	    this.velocity.x = 0;
	    this.pos.x += 2;
	  } else {
	    var playXvel = this.velocity.x;
	    var angle = Math.atan(ramp.height/ramp.width);
	    var distFromRampStart = (this.pos.x + this.width) - ramp.ppos.x;
	    var heightShouldBe = ramp.ppos.y - (Math.tan(angle) * distFromRampStart);
	
	    // debugger;
	    if (this.pos.y + this.height - ramp.height >= heightShouldBe - 2) {
	      this.velocity.x *= Math.cos(angle);
	      this.pos.y -= ( playXvel * Math.sin(angle) )/ this.gravity;
	      // this.velocity.y += 1  ;
	      this.grounded = true;
	      this.jumping = false;
	    }
	  }
	
	
	  // var rampX = ramp.cpos.x - this.camera.cpos.x;
	  // var rampY = ramp.cpos.y - this.camera.cpos.y;
	  // this.pos.x += 2;
	  //
	  //
	  // } else if (dir === "r") {
	  //   this.velocity.x = 0;
	  //
	  // } else if (dir === "b") {
	  //   this.grounded = true;
	  //   this.jumping = false;
	  //
	  // } else if (dir === "t") {
	  //   this.velocity.y *= -1;
	  // }
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
/***/ function(module, exports) {

	var Box = function (options) {
	    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
	    this.ppos = { x: options.ppos.x, y: options.ppos.y};
	    this.acel = { x: options.acel.x, y: options.acel.y};
	    this.width = options.width;
	    this.height = options.height;
	};
	
	module.exports = Box;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Ramp = function (options) {
	    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
	    this.ppos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
	    this.width = options.width;
	    this.height = options.height;
	    this.slant = options.slant;
	    this.rampX = undefined;
	    this.rampY = undefined;
	};
	// Slant nomenclature
	  // bl-tr bottom line and right line
	  // br-tl bottom line and left line
	  // tl-br top line and right line
	  // tr-bl top line and left line
	
	Ramp.prototype.draw = function (context) {
	  context.fillStyle = "green";
	  context.beginPath();
	
	  // context.fillRect(rampX, rampY, this.width, this.height);
	
	  if (this.slant === 'bl-tr') {
	    context.moveTo(this.rampX, this.rampY + this.height);
	    context.lineTo(this.width + this.rampX, this.rampY + this.height);
	    context.lineTo(this.rampX + this.width, this.rampY);
	    context.fill();
	  }
	
	  // if (this.slant === 'br-tl') {
	  //   context.lineTo();
	  //   context.lineTo();
	  //   this.context.fill();
	  // }
	  //
	  // if (this.slant === 'tl-br') {
	  //
	  // }
	  //
	  // if (this.slant === 'bl-tr') {
	  //
	  // }
	};
	
	module.exports = Ramp;


/***/ },
/* 6 */
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
	    this.target.x = targetObj.pos.x + (this.width / 3) - (this.width / 2); //sets target x to center of screen relative to player
	  } else {
	    this.target.x = targetObj.pos.x - (this.width / 3) - (this.width / 2);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(4);
	var Trigger = __webpack_require__(8);
	var Player = __webpack_require__(2);
	var Camera = __webpack_require__(6);
	var TextOverlay = __webpack_require__(9);
	var Ramp = __webpack_require__(5);
	
	var TempWorld = function (game) {
	  this.game = game;
	  this.height = 2000;
	  this.width = 6000;
	  this.boxes = [];
	  this.triggers = [];
	  this.textOverlays = [];
	  this.ramps = [];
	
	  this.initiateBoxes();
	  this.initiateTriggers();
	  this.initiateRamps();
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
	
	  for (var i = 0; i < 2000; i+=200) {
	    this.boxes.push(new Box({
	      cpos : { x : 300 + i, y : this.height - 70 - i},
	      ppos : { x : 300 + i, y : this.height - 70 - i },
	      acel : { x: 0, y : 0 },
	      width: 300,
	      height: 10,
	    }));
	  }
	};
	
	TempWorld.prototype.initiateTriggers = function () {
	  var worldContext = this;
	
	  this.triggers.push(new Trigger({
	    cpos : { x : 800, y : this.height - 70 },
	    ppos : { x : 800, y : this.height - 70 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 50,
	    activate: function () {
	      worldContext.game.camera.screenShake();
	    }
	  }));
	
	  this.triggers.push(new Trigger({
	    cpos : { x : 1200, y : this.height - 70 },
	    ppos : { x : 1200, y : this.height - 70 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 50,
	    activate: function () {
	      worldContext.textOverlays.push(
	        new TextOverlay({
	          message: "aye bruh",
	          fontSize: 24,
	        })
	      );
	    }
	  }));
	
	  this.triggers.push(new Trigger({
	    cpos : { x : 1700, y : this.height - 70 },
	    ppos : { x : 1700, y : this.height - 70 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 50,
	    activate: function () {
	      worldContext.textOverlays.push(
	        new TextOverlay({
	          message: "honkey tonk",
	          fontSize: 24,
	        })
	      );
	    }
	  }));
	
	  this.triggers.push(new Trigger({
	    cpos : { x : 1300, y : this.height - 1070 },
	    ppos : { x : 1300, y : this.height - 1070 },
	    acel : { x: 0, y : 0 },
	    width: 50,
	    height: 50,
	    activate: function () {
	      worldContext.textOverlays.push(
	        new TextOverlay({
	          message: "hey tony whered you \ get that fresh peperoney",
	          fontSize: 24,
	        })
	      );
	    }
	  }));
	};
	
	TempWorld.prototype.initiateRamps = function () {
	  this.ramps.push(new Ramp({
	    cpos : { x : 2000, y : this.height - 150 },
	    width: 800,
	    height: 140,
	    slant: 'bl-tr'
	  }));
	
	  this.ramps.push(new Ramp({
	    cpos : { x : 2400, y : this.height - 350 },
	    width: 800,
	    height: 400,
	    slant: 'bl-tr'
	  }));
	};
	
	module.exports = TempWorld;


/***/ },
/* 8 */
/***/ function(module, exports) {

	var Trigger = function (options) {
	    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
	    this.ppos = { x: options.ppos.x, y: options.ppos.y};
	    this.acel = { x: options.acel.x, y: options.acel.y};
	    this.width = options.width;
	    this.height = options.height;
	    this.activate = options.activate;
	};
	
	module.exports = Trigger;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var TextOverlay = function (options) {
	    this.message = options.message;
	    this.fontSize = options.fontSize;
	    this.alpha = 1;
	    this.yPosMod = 0;
	};
	
	TextOverlay.prototype.draw = function(context, xPos, yPos) {
	  context.beginPath();
	  context.fillStyle = "white";
	  context.globalAlpha = this.alpha;
	  context.font = "italic "+this.fontSize+"pt Arial ";
	  context.globalCompositeOperation = 'overlay';
	  context.fillText(this.message, xPos, yPos + this.yPosMod);
	  context.globalCompositeOperation = 'source-over';
	  this.update();
	  context.globalAlpha = 1;
	};
	
	TextOverlay.prototype.update = function () {
	  if (this.alpha > 0) {
	    this.alpha -= 0.005;
	  }
	  this.yPosMod += 1;
	};
	
	module.exports = TextOverlay;


/***/ },
/* 10 */
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map