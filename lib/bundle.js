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

	var Menu = __webpack_require__(31);
	var LevelOne = __webpack_require__(21);
	var GameView = __webpack_require__(11);
	
	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext('2d');
	
	  canvas.width = 1000;
	  canvas.height = 600;
	
	  var gameStartCallback = function () {
	    var levelOne = new LevelOne(context);
	    new GameView(levelOne).start();
	  };
	
	  new Menu(context, gameStartCallback);
	});


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(6);
	
	var Player = function (context, startX, startY, jumpHeight) {
	  var image = new Image();
	  image.src = 'http://www.learnjquery.org/newsletter/sonic.png';
	
	  this.sprite = {
	    img: image,
	    frameIdx: 0,
	    numFrames: 8,
	    height: 100,
	    width: 800
	  };
	
	  MovingObject.call(
	    this, context, startX, startY, jumpHeight,
	    { height: 80, width: 30 }
	  );
	};
	
	Util.inherits(Player, MovingObject);
	
	Player.prototype.render = function (camera) {
	  var xPos = this.pos.x - camera.cpos.x;
	  var yPos = this.pos.y - camera.cpos.y;
	
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
	
	// Player.prototype.renderTrails = function () {
	//   this.pastPos.forEach(function (ghostPos) {
	//
	//     // this.context.globalAlpha = 0.2;
	//     this.context.drawImage(
	//       this.sprite.img,
	//       this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
	//       0,
	//       this.sprite.width / this.sprite.numFrames,
	//       this.sprite.height,
	//       ghostPos[0] - this.width - 5,
	//       ghostPos[1] - this.sprite.height + this.height + 10,
	//       this.sprite.width / this.sprite.numFrames,
	//       this.sprite.height
	//     );
	//   }.bind(this));
	// };
	
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
	var StaticObject = __webpack_require__(13);
	
	var Box = function (options) {
	  StaticObject.call(this, options);
	};
	
	Util.inherits(Box, StaticObject);
	
	module.exports = Box;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var StaticObject = __webpack_require__(13);
	
	var Ramp = function (options) {
	    this.slant = options.slant;
	    this.rampX = undefined;
	    this.rampY = undefined;
	    StaticObject.call(this, options);
	};
	
	Util.inherits(Ramp, StaticObject);
	// Slant nomenclature
	  // bl-tr bottom line and right line
	  // br-tl bottom line and left line
	  // tl-br top line and right line
	  // tr-bl top line and left line
	
	Ramp.prototype.render = function (camera) {
	  this.rampX = this.pos.x - camera.cpos.x;
	  this.rampY = this.pos.y - camera.cpos.y;
	
	  this.context.fillStyle = "brown";
	  this.context.beginPath();
	
	  // context.fillRect(rampX, rampY, this.width, this.height);
	
	  if (this.slant === 'bl-tr') {
	    // move to bottom left
	    this.context.moveTo(this.rampX, this.rampY + this.height);
	
	    // line to to top right
	    this.context.lineTo(this.width + this.rampX, this.rampY + this.height);
	
	    // line to to bottom right
	    this.context.lineTo(this.rampX + this.width, this.rampY);
	    this.context.fill();
	  }
	
	  if (this.slant === 'tl-br') {
	    // get in position
	    this.context.moveTo(this.rampX, this.rampY);
	
	    // vertical line to bottom left
	    this.context.lineTo(this.rampX, this.rampY + this.height);
	
	    // horizontal line to bottom right
	    this.context.lineTo(this.rampX + this.width, this.rampY + this.height);
	
	    this.context.fill();
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

	var Box = __webpack_require__(4);
	var Ramp = __webpack_require__(5);
	var Shroom = __webpack_require__(12);
	var Trigger = __webpack_require__(9);
	var Ladder = __webpack_require__(28);
	
	var MovingObject = function (context, startX, startY, jumpHeight, size) {
	  this.pos = { x: startX, y: startY };
	  this.context = context;
	  this.height = size.height;
	  this.width = size.width;
	  this.velocity = { x: 0, y: 0 };
	  this.jumpHeight = jumpHeight;
	
	  this.collisions = [];
	  this.onDoor = {};
	  this.onLadder = {};
	  this.notOnLadder = true;
	  this.grounded = false;
	  this.jumping = false;
	  this.facing = "r";
	
	  this.gravity = 0.80;
	  this.friction = 0.90;
	  this.maxVel = 20;
	};
	
	MovingObject.prototype.processInteraction = function (game) {
	  if (this.onDoor) {
	    for (var doorName in this.onDoor) {
	      if (this.onDoor.hasOwnProperty(doorName)) {
	        if (this.onDoor[doorName]) {
	          game.enterDoor(this.onDoor[doorName]);
	        }
	      }
	    }
	  } else {
	    /// put stuff here later
	  }
	};
	
	MovingObject.prototype.processInput = function (dir) {
	  this.notOnLadder = true;
	
	  for (var ladderId in this.onLadder) {
	    if (this.onLadder.hasOwnProperty(ladderId)) {
	      if (this.onLadder[ladderId]) {
	        this.notOnLadder = false;
	        this.gravity = 0;
	        this.velocity.y = 0;
	        this.moveOnLadder(dir);
	      }
	    }
	  }
	
	  if (this.notOnLadder) {
	    if (dir === 'up') {
	      this.jump();
	    }
	  }
	};
	
	MovingObject.prototype.impulse = function (dir) {
	  if (dir > 0) {
	    this.facing = "r";
	    this.velocity.x++;
	
	  } else if (dir < 0) {
	    this.facing = "l";
	    this.velocity.x--;
	  }
	};
	
	MovingObject.prototype.moveOnLadder = function (dir) {
	  if (dir === 'up') {
	    this.goingDown = false;
	    this.pos.y -= 4;
	  } else if (dir === 'down') {
	    this.goingDown = true;
	    this.pos.y += 4;
	  }
	};
	
	MovingObject.prototype.jump = function () {
	  if (!this.jumping && this.grounded) {
	    this.jumping = true;
	    this.grounded = false;
	    this.pos.y -= 5;
	    this.velocity.y = this.jumpHeight;
	  }
	};
	
	MovingObject.prototype.move = function () {
	  // run collision callbacks and clear array
	
	  for (var ladderId in this.onLadder) {
	    if (this.onLadder.hasOwnProperty(ladderId)) {
	      if (this.onLadder[ladderId]) {
	        this.notOnLadder = false;
	      }
	    }
	  }
	
	  this.grounded = false;
	
	  var rampIdx = [];
	  this.collisions.forEach(function (colArray, index) {
	    if (colArray[0] instanceof Ramp) {
	      rampIdx.push(index);
	    }
	    if (rampIdx.length > 1) {
	      this.collisions.splice(rampIdx[1], 1);
	      this.pos.y -= 1;
	    } else {
	      this.collision(
	        colArray[0], // obj
	        colArray[1], // dir
	        colArray[2] // oBump
	      );
	    }
	  }.bind(this));
	  this.collisions = [];
	
	  if(this.grounded) {
	    this.velocity.y = 0;
	  }
	
	  this.pos.x += this.velocity.x;
	  this.pos.y += this.velocity.y;
	
	  // friction
	  this.velocity.x *= this.friction;
	
	  // gravity
	  if (this.velocity.y <= this.maxVel) {
	    this.velocity.y += this.gravity;
	  }
	};
	
	MovingObject.prototype.collision = function (obj, dir, oBump) {
	  if (obj instanceof Box) {
	    this.boxCollision(obj, dir, oBump);
	  } else if (obj instanceof Ramp) {
	    this.rampCollision(obj, dir, oBump);
	  } else if (obj instanceof Shroom) {
	    if (dir === 'bottom') {
	      this.shroomCollision(obj, dir, oBump);
	    } else {
	      this.boxCollision(obj, dir, oBump);
	    }
	  } else if (obj instanceof Ladder && dir === 'bottom') {
	    if (!this.goingDown) {
	      this.boxCollision(obj, dir, oBump/5);
	    }
	  } else if (obj instanceof Trigger) {
	    obj.activate();
	  }
	};
	
	MovingObject.prototype.shroomCollision = function (obj, dir, oBump) {
	  this.jumping = true;
	  this.grounded = false;
	  this.pos.y -= oBump;
	  this.velocity.y = -40;
	};
	
	MovingObject.prototype.boxCollision = function (obj, dir, oBump) {
	  if (dir === "left") {
	    this.pos.x += oBump;
	    this.velocity.x = 0;
	
	  } else if (dir === "right") {
	    this.pos.x += oBump;
	    this.velocity.x = 0;
	
	  } else if (dir === "bottom") {
	    this.pos.y += oBump;
	    this.grounded = true;
	    this.jumping = false;
	
	  } else if (dir === "top") {
	    this.pos.y += oBump;
	    this.velocity.y *= -1;
	  }
	};
	
	MovingObject.prototype.rampCollision = function (ramp, dir, oBump) {
	  var playXvel = this.velocity.x;
	  var angle =  Math.atan(ramp.height/ramp.width);
	  var distFromRampStart;
	  var heightShouldBe;
	  // add checks for which type but for now just do bl-tr
	
	  if (ramp.slant === 'bl-tr') {
	    distFromRampStart = (this.pos.x + this.width) - ramp.pos.x;
	    heightShouldBe = ramp.pos.y - (Math.tan(angle) * distFromRampStart);
	
	    if (dir === "left") {
	      this.velocity.x = 0;
	      this.pos.x += oBump;
	    } else {
	      if (this.facing === 'r') {
	        this.velocity.x *= Math.cos(angle);
	      } else {
	        this.velocity.x *= 1.05;
	      }
	      if (this.pos.y + this.height - ramp.height >= heightShouldBe - 2) {
	        this.pos.y -= playXvel * Math.sin(angle);
	        this.velocity.y -= this.gravity - 1;
	        this.grounded = true;
	        this.jumping = false;
	      }
	    }
	  } else if (ramp.slant === 'tl-br') {
	    // angle = 3.14 - angle;
	    // distFromRampStart = Math.abs(ramp.pos.x - (this.pos.x + this.width));
	    // heightFromRampStart = ramp.pos.y + this.pos.y;
	    // // var distShouldBe = -(heightShouldBe / Math.atan(angle)) - this.width;
	    // // var distShouldBe = Math.abs(ramp.width - distFromRampStart);
	    // var posOnHypotenuseIs = -1 * Math.cos(angle) * (ramp.width - distFromRampStart);
	    // heightShouldBe = p
	    //
	    // console.log('height is: ' + heightFromRampStart);
	    // // console.log('dist should: ' + distShouldBe);
	    // console.log('dist is: ' + distFromRampStart);
	    // console.log(posOnHypotenuseIs);
	    //
	    // // console.log(this.pos.y + this.height - ramp.height);
	    //
	    heightShouldBe = Math.tan(angle) * Math.abs(ramp.pos.x - this.pos.x);
	
	    if (Math.abs(ramp.pos.x - this.pos.x) < this.width) {
	      this.velocity.x = 0;
	      this.pos.x += oBump;
	    } else {
	      if (this.facing === 'l') {
	        this.velocity.x *= -0.01;
	      } else {
	        this.velocity.x *= 1.05;
	      }
	      if (heightShouldBe <= Math.abs(ramp.pos.y - this.pos.y)) {
	        this.pos.y -= playXvel * Math.sin(angle);
	        this.velocity.y -= this.gravity - 1;
	        this.grounded = true;
	        this.jumping = false;
	      }
	        // if (this.pos.y + this.height - ramp.height >= heightShouldBe - 2) {
	        //   this.pos.y -= playXvel * Math.sin(angle);
	        //   this.velocity.y -= this.gravity - 1;
	        //   this.grounded = true;
	        //   this.jumping = false;
	        // }
	        //
	        // if (this.facing === 'l') {
	        //   this.velocity.x *= 0;
	        // }
	        //
	        // this.velocity.y *= 0;
	        // this.velocity.y -= this.gravity;
	        // this.pos.y -= 1;
	
	
	    }
	    // console.log('ramp h: ' + ramp.height);
	    // console.log('ramp w: ' + ramp.width);
	    // console.log('ramp angle: ' + 360 * angle / Math.PI);
	    // console.log('pl x frm ramp strt: ' + Math.abs(ramp.pos.x - this.pos.x));
	    // console.log('pl y frm ramp strt: ' + Math.abs(ramp.pos.y - this.pos.y));
	    // console.log('pos on hyp: ' +
	    //   Math.sqrt(
	    //     Math.pow(Math.abs(ramp.pos.x - this.pos.x), 2) +
	    //     Math.pow(Math.abs(ramp.pos.y - this.pos.y), 2)
	    //   )
	    // );
	    // console.log(Math.sqrt(Math.pow(ramp.height, 2) + Math.pow(ramp.width, 2)));
	
	
	  }
	
	        // // if (angle > 3.14/2 && this.facing === 'l') {
	        // //   this.velocity.x *= 0;
	        // if (this.facing === 'l') {
	        //   this.velocity.x *= 0;
	        //   // this.velocity.x *= Math.cos(angle);
	        // } else
	        //   this.velocity.x *= 1.05;
	        // }
	      // }
	    // }
	      // if (distFromRampStart < distShouldBe) {
	      //   this.velocity.x = 0;
	      //   this.pos.x += 1;
	      //   // this.pos.y -= playXvel * Math.sin(angle);
	      //   // this.velocity.y -= this.gravity - 1;
	      //   // this.grounded = true;
	      //   // this.jumping = false;
	      // }
	};
	
	
	
	module.exports = MovingObject;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	
	var Camera = function (height, width, world) {
	  this.world = world;
	  this.cpos = { x: 50, y: world.height - 50 }; // "current pos" top left corner of camera object
	  this.ppos = { x: 50, y: world.height - 50 }; // "past pos"
	  this.acel = { x: 0, y: 0 }; // acceleration of camera object
	
	  this.setCameraDimensions(height, width, world);
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
	
	Camera.prototype.setCameraDimensions = function (height, width, world) {
	  if (world.height <= height) {
	    this.height = world.height;
	  } else {
	    this.height = height;
	  }
	
	  if (world.width <= width) {
	    this.width = world.width;
	  } else {
	    this.width = width;
	  }
	};
	
	Camera.prototype.squashCamera = function() {
	  this.height -= 10;
	  // this.cullDistY.top += 10;
	  // this.cullDistY.bottom -= 10;
	};
	
	Camera.prototype.screenShake = function() {
	  this.strength = 90;
	  this.damper = 5;
	};
	
	Camera.prototype.move = function (targetObj) {
	  // get the target point
	  if (targetObj.facing === "r") {
	    this.target.x = targetObj.pos.x - (this.width / 6); //sets target x to center of screen relative to player
	  } else {
	    this.target.x = targetObj.pos.x - (5 * this.width / 6);
	  }
	  this.target.y = targetObj.pos.y - (this.height / 1.3); // same but with y
	
	  var ratio = this.world.game.height / this.height;
	  // move camera towards target point
	  this.acel.x += (1 / 8) * (this.target.x - this.cpos.x); // acceleration vector
	  this.acel.y += (this.target.y - this.cpos.y);
	
	  // camera shake update
	  if (this.strength > 0) {
	    var randx = Math.random() * 2 * this.strength - this.strength;
	    var randy = Math.random() * 2 * this.strength - this.strength;
	    this.acel.x += randx;
	    this.acel.y += randy;
	    this.strength -= this.damper;
	  }
	
	  // camera drag
	  this.ppos.x = this.cpos.x + (this.ppos.x - this.cpos.x) * 0.5;
	  this.ppos.y = this.cpos.y + (this.ppos.y - this.cpos.y) * 0.5;
	
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
	
	
	Camera.prototype.startHallwaySquash = function (player) {
	  this.hallwaySquash(player);
	};
	
	Camera.prototype.hallwaySquash = function (player) {
	  if (this.height >= 400) {
	    if (player.velocity.x > 0.5) {
	      this.height -= 0.2;
	    }
	  } else if (this.height <= this.world.height) {
	    if (player.velocity.x < -0.5) {
	      this.height += 0.2;
	    }
	  }
	
	  this.squashCam = window.setTimeout(this.hallwaySquash.bind(this, player), 60);
	};
	
	Camera.prototype.endHallwaySquash = function () {
	  window.clearTimeout(this.squashCam);
	};
	
	module.exports = Camera;


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var StaticObject = __webpack_require__(13);
	
	var Trigger = function (options) {
	  this.activate = options.activate;
	  this.notActivated = true;
	  StaticObject.call(this, options);
	};
	
	Util.inherits(Trigger, StaticObject);
	
	  Trigger.prototype.render = function () {
	    // dont do shit
	  };
	
	module.exports = Trigger;


/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports) {

	var GameView = function (game) {
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
	    this.game.player.processInput('up');
	  }
	
	  // left - a
	  if (this.inputs[65]) {
	    this.game.player.impulse(-1);
	  }
	
	  // right - d
	  else if (this.inputs[68]) {
	    this.game.player.impulse(1);
	  }
	
	  else if (this.inputs[83]) {
	    this.game.player.processInput('down');
	  }
	
	  // shift - screen shake
	  // if (this.inputs[16]) {
	  //   this.game.camera.screenShake();
	  // }
	  //
	  // space - screen squash
	  // if (this.inputs[32]) {
	  //   this.game.camera.squashCamera();
	  // }
	
	  if (this.inputs[69]) {
	    this.game.player.processInteraction(this.game);
	    this.inputs[69] = false;
	  }
	};
	
	module.exports = GameView;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var StaticObject = __webpack_require__(13);
	
	var Shroom = function (options) {
	  StaticObject.call(this, options);
	};
	
	Shroom.prototype.collision = function () {
	  // doesn't do shit
	};
	
	Shroom.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
	  //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
	
	    this.context.fillStyle = "green";
	    this.context.beginPath();
	    this.context.fillRect(newX, newY, this.width, this.height);
	  // }
	};
	
	module.exports = Shroom;


/***/ },
/* 13 */
/***/ function(module, exports) {

	var StaticObject = function (options) {
	  this.pos = { x: options.pos.x, y: options.pos.y }; // camera position vector center
	  this.context = options.context;
	  this.width = options.width;
	  this.height = options.height;
	
	  // this.collisions = [];
	};
	
	StaticObject.prototype.collision = function () {
	  // don't do anything
	};
	
	StaticObject.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
	  //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
	
	    this.context.fillStyle = "green";
	    // this.context.fillStyle = "#090A09";
	    this.context.beginPath();
	    this.context.fillRect(newX, newY, this.width, this.height);
	  // }
	};
	
	module.exports = StaticObject;


/***/ },
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var StaticObject = __webpack_require__(13);
	
	var Door = function (options) {
	  this.doorPath = options.doorPath;
	  StaticObject.call(this, options);
	};
	
	Util.inherits(Door, StaticObject);
	
	Door.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  this.context.fillStyle = "brown";
	  this.context.beginPath();
	  this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	Door.prototype.collision = function (obj, dir) {
	  if (dir) {
	    obj.onDoor[this.doorPath.door] = this.doorPath;
	  } else {
	    obj.onDoor[this.doorPath.door] = false;
	  }
	};
	
	module.exports = Door;


/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(4);
	var Trigger = __webpack_require__(9);
	var Ramp = __webpack_require__(5);
	var Door = __webpack_require__(16);
	var Shroom = __webpack_require__(12);
	var CreepingShroom = __webpack_require__(29);
	var ChasingEnemy = __webpack_require__(30);
	var Ladder = __webpack_require__(28);
	var TextOverlay = __webpack_require__(10);
	
	var BasicRoom = function (options) {
	  this.game = options.game;
	  this.height = options.height;
	  this.width = options.width;
	  this.playerJump = options.playerJump;
	  this.playerStart = {
	    x: options.playerX,
	    y: options.playerY
	  };
	  this._staticObjects = [
	    new Box({
	      pos : { x : 0, y : 0 },
	      context : this.game.context,
	      width: 40,
	      height: this.height
	    }),
	
	    // right box
	    new Box({
	      pos : { x : this.width - 10, y : 0 },
	      context : this.game.context,
	      width: 50,
	      height: 6 * this.height
	    }),
	
	    // top box
	    // new Box({
	    //   pos : { x : 0, y : 0 },
	    //   context : this.game.context,
	    //   width: this.width,
	    //   height: 40,
	    // }),
	
	    // bottom box
	    new Box({
	      pos : { x : 0, y : this.height - 10 },
	      context : this.game.context,
	      width: this.width,
	      height: 40,
	    })
	  ];
	
	  this._movingObjects = [];
	
	  this.setPlayerLocation(options);
	};
	
	BasicRoom.prototype.setPlayerLocation = function (options) {
	  if (options.doorCoords) {
	    this.playerStart = {
	      x: options.doorCoords.x,
	      y: options.doorCoords.y
	    };
	  } else {
	    this.playerStart = {
	      x: options.playerX,
	      y: options.playerY
	    };
	  }
	};
	
	BasicRoom.prototype.modifyObject = function (type, idType, idValue) {
	  var game = this.game;
	  var types = {
	    movingObject: game._movingObjects,
	    staticObject: game._staticObjects
	  };
	
	  var returnVal = null;
	
	  types[type].forEach(function (obj, index) {
	    if (obj[idType] && obj[idType] === idValue) {
	      returnVal = {
	        obj: obj,
	        type: types[type],
	        index: index
	      };
	    }
	  });
	
	  return returnVal;
	};
	
	BasicRoom.prototype.Box = Box;
	BasicRoom.prototype.Trigger = Trigger;
	BasicRoom.prototype.Ramp = Ramp;
	BasicRoom.prototype.Door = Door;
	BasicRoom.prototype.Shroom = Shroom;
	BasicRoom.prototype.CreepingShroom = CreepingShroom;
	BasicRoom.prototype.ChasingEnemy = ChasingEnemy;
	BasicRoom.prototype.TextOverlay = TextOverlay;
	BasicRoom.prototype.Ladder = Ladder;
	
	module.exports = BasicRoom;


/***/ },
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var BasicGame = __webpack_require__(27);
	var RoomOne = __webpack_require__(22);
	var RoomTwo = __webpack_require__(24);
	var RoomThree = __webpack_require__(25);
	var RoomFour = __webpack_require__(26);
	
	var LevelOne = function (context) {
	  BasicGame.call(
	    this,
	    context,
	    {
	      initialRoom: 'roomOne',
	      rooms: {
	        roomOne: RoomOne,
	        roomTwo: RoomTwo,
	        roomThree: RoomThree,
	        roomFour: RoomFour
	    }
	  });
	};
	
	Util.inherits(LevelOne, BasicGame);
	
	module.exports = LevelOne;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var Util = __webpack_require__(3);
	var PathUtil = __webpack_require__(23);
	var path = PathUtil.inLevelOne;
	
	var RoomOne = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 500,
	    width: 750,
	    playerJump: -10,
	    playerX: 620,
	    playerY: 420,
	    doorCoords: doorCoords
	  });
	
	  this.initiate();
	};
	
	Util.inherits(RoomOne, BasicRoom);
	
	RoomOne.prototype.initiate = function () {
	  var worldContext = this;
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 50, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'roomTwo',
	      coords: {
	        x: path.fromRoomOne.toRoomTwo.x,
	        y: path.fromRoomOne.toRoomTwo.y
	      }
	    }
	  }));
	};
	
	module.exports = RoomOne;


/***/ },
/* 23 */
/***/ function(module, exports) {

	var PathUtil = {
	  inLevelOne: {
	    fromRoomOne: {
	      toRoomTwo: { x: 3220, y: 670 }
	    },
	    fromRoomTwo: {
	      toRoomOne: { x: 70, y: 420 },
	      toRoomThree: { x: 70, y: 470 }
	    },
	    fromRoomThree: {
	      toRoomTwo: { x: 4940, y: 220 },
	      toRoomFour: { x: 70, y: 420 }
	    }
	  },
	  inLevelTwo: {},
	  inLevelThree: {}
	};
	
	module.exports = PathUtil;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// notable events: cave in at left of room, locked door at bottom right
	//   ladder, leading up to door to room 3.
	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var Util = __webpack_require__(3);
	var PathUtil = __webpack_require__(23);
	var path = PathUtil.inLevelOne;
	
	var RoomTwo = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 750,
	    width: 5000,
	    playerJump: -10,
	    playerStartX: 1200,
	    playerStartY: 670,
	    doorCoords: doorCoords
	  });
	
	  this.initiate();
	};
	
	Util.inherits(RoomTwo, BasicRoom);
	
	RoomTwo.prototype.initiate = function () {
	  var worldContext = this;
	
	  // BOXES
	
	  // far right platform
	  this._staticObjects.push(new this.Box({
	    pos : { x : 4500, y : 250 },
	    context : this.game.context,
	    width: 500,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 4330, y : 250 },
	    context : this.game.context,
	    width: 100,
	    height: 20,
	  }));
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 3200, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'roomOne',
	      coords: {
	        x: path.fromRoomTwo.toRoomOne.x,
	        y: path.fromRoomTwo.toRoomOne.y
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 4920, y : 150 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'roomThree',
	      coords: {
	        x: path.fromRoomTwo.toRoomThree.x,
	        y: path.fromRoomTwo.toRoomThree.y
	      }
	    }
	  }));
	
	  // LADDERS
	
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 4430, y : 250 },
	    context : this.game.context,
	    width: 70,
	    height: 490,
	    ladderId: 1
	  }));
	
	
	  // Events
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1200, y : this.height - 300 },
	    context : this.game.context,
	    width: 50,
	    height: 300,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.camera.screenShake();
	        worldContext.spawnCreepingShroom();
	        this.notActivated = false;
	      }
	    }
	  }));
	};
	
	RoomTwo.prototype.spawnCreepingShroom = function () {
	  var shroom = new this.CreepingShroom({
	    pos : { x : 50, y : this.height - 180 },
	    context : this.game.context,
	    height: 130,
	    width: 50,
	    growsToward: 'right'
	  });
	
	  this.game._movingObjects.push(shroom);
	  this._movingObjects.push(shroom);
	};
	
	
	module.exports = RoomTwo;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// notable events:
	//  enemy midway through room, when player gets to a certain distance,
	//   he charges the player.
	//  ladder midway through room to get around enemy. When player lands on
	//   pile of tables, the tables crush the enemy
	//  door to room 4
	var BasicRoom = __webpack_require__(18);
	var Util = __webpack_require__(3);
	var PathUtil = __webpack_require__(23);
	var path = PathUtil.inLevelOne;
	
	var RoomThree = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 550,
	    width: 3000,
	    playerJump: -10,
	    playerStartX: 50,
	    playerStartY: 470,
	    doorCoords: doorCoords
	  });
	
	  this.initiate();
	};
	
	Util.inherits(RoomThree, BasicRoom);
	
	RoomThree.prototype.initiate = function () {
	  var worldContext = this;
	
	  // BOXES
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1500, y : 150 },
	    context : this.game.context,
	    width: 350,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1800, y : 180 },
	    context : this.game.context,
	    width: 200,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 300, y : 150 },
	    context : this.game.context,
	    width: 500,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 900, y : 310 },
	    context : this.game.context,
	    width: 300,
	    height: 20,
	  }));
	
	  // Ladders
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 1430, y : 150 },
	    context : this.game.context,
	    width: 70,
	    height: 310,
	    ladderId: 1
	  }));
	
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 230, y : 150 },
	    context : this.game.context,
	    width: 70,
	    height: 150,
	    ladderId: 2
	  }));
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 50, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'roomTwo',
	      coords: {
	        x: path.fromRoomThree.toRoomTwo.x,
	        y: path.fromRoomThree.toRoomTwo.y
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 2850, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'roomFour',
	      coords: {
	        x: path.fromRoomThree.toRoomFour.x,
	        y: path.fromRoomThree.toRoomFour.y
	      }
	    }
	  }));
	
	  // Ramps
	  this._staticObjects.push(new this.Ramp({
	    pos : { x : 2050, y : 210 },
	    context : this.game.context,
	    width: 290,
	    height: 330,
	    slant: 'tl-br'
	  }));
	
	  // Triggers
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1000, y : this.height - 100 },
	    context : this.game.context,
	    width: 50,
	    height: 100,
	    activate: function () {
	      if (this.notActivated) {
	        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
	        enemy.obj.activated = true;
	
	        var ladder = worldContext.modifyObject('staticObject', 'ladderId', 2);
	        worldContext.game._staticObjects[ladder.index].height = 350;
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 2100, y : this.height - 300 },
	    context : this.game.context,
	    width: 350,
	    height: 300,
	    activate: function () {
	      if (this.notActivated) {
	        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
	        enemy.obj.activated = false;
	
	        window.setTimeout(function () {
	          worldContext.game._movingObjects.splice(enemy.index, 1);
	        }, 1000);
	
	        worldContext.game.camera.screenShake();
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  // Enemies
	  this._movingObjects.push(new this.ChasingEnemy({
	    pos : { x : 1500, y : 450 },
	    context : this.game.context,
	    width: 100,
	    height: 100,
	    activated: false,
	    triggerId: 1
	  }));
	};
	
	module.exports = RoomThree;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// notable events: locked door at end of room, when player tries door, enemy
	//  walks in, collapses, and after ten or so seconds, bursts, creating a
	//  shower of pollen, start transition, end level 1.
	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var Util = __webpack_require__(3);
	var PathUtil = __webpack_require__(23);
	var path = PathUtil.inLevelOne;
	
	var RoomFour = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 500,
	    width: 750,
	    playerJump: -10,
	    playerX: 620,
	    playerY: 420,
	    doorCoords: doorCoords
	  });
	
	  this.initiate();
	};
	
	Util.inherits(RoomFour, BasicRoom);
	
	RoomFour.prototype.initiate = function () {
	  var worldContext = this;
	
	  // DOORS
	  // this._staticObjects.push(new this.Door({
	  //   pos : { x : 50, y : this.height - 110 },
	  //   context : this.game.context,
	  //   width: 70,
	  //   height: 100,
	  //   doorPath: {
	  //     door: 'roomTwo',
	  //     coords: {
	  //       x: path.fromRoomFour.toRoomTwo.x,
	  //       y: path.fromRoomFour.toRoomTwo.y
	  //     }
	  //   }
	  // }));
	};
	
	module.exports = RoomFour;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Camera = __webpack_require__(7);
	var Util = __webpack_require__(3);
	var Trigger = __webpack_require__(9);
	var Ramp = __webpack_require__(5);
	var Door = __webpack_require__(16);
	var canvas = document.getElementById("canvas");
	
	var BasicGame = function (context, options) {
	  // options has: initialRoom, rooms
	  this.options = options;
	  this.deathCount = 0;
	  this.countdownActive = false;
	  this.switchRooms(context, { door: options.initialRoom });
	};
	
	BasicGame.prototype.switchRooms = function (context, room) {
	  var options = this.options;
	
	  this.context = context;
	  this.rooms = options.rooms;
	
	  this.world = new this.rooms[room.door](this, room.coords);
	  this.height = this.world.height;
	  this.width = this.world.width;
	
	  this.camera = new Camera(
	    canvas.height,
	    canvas.width,
	    this.world
	  );
	
	  this.player = new Player(
	    context,
	    this.world.playerStart.x,
	    this.world.playerStart.y,
	    this.world.playerJump
	  );
	
	  this.cameraTarget = this.player;
	  this._staticObjects = this.world._staticObjects;
	  this._movingObjects = this.world._movingObjects;
	};
	
	BasicGame.prototype.step = function() {
	  this.moveObjects();
	  this.checkAllCollisions();
	  this.draw();
	};
	
	BasicGame.prototype.moveObjects = function () {
	  this.camera.move(this.player);
	  this._movingObjects.forEach(function (obj) {
	    obj.move(this.player);
	  }.bind(this));
	  this.player.move();
	};
	
	BasicGame.prototype.draw = function() {
	  var _allObjects = this._staticObjects.concat(this._movingObjects).concat([this.player]);
	
	  this.clearBlack();
	
	  _allObjects.forEach(function (obj) {
	    obj.render(this.camera);
	  }.bind(this));
	
	  this.blackBars();
	};
	
	BasicGame.prototype.clearBlack = function () {
	  var context = this.context;
	  var camera = this.camera;
	
	  context.beginPath();
	  context.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	BasicGame.prototype.blackBars = function () {
	  var context = this.context;
	  var camera = this.camera;
	  // x, y, width, height
	
	  context.fillStyle = "black";
	  // top - bottom
	  context.fillRect(0, 0, canvas.width, canvas.height - camera.height);
	  context.fillRect(0, camera.height, canvas.width, canvas.height);
	
	  // clears right side if smaller than canvas
	  context.fillRect(camera.width, 0, canvas.width - camera.width, canvas.height);
	};
	
	BasicGame.prototype.checkAllCollisions = function () {
	  this._movingObjects.concat(this._staticObjects).forEach(function (obj) {
	    this.collisionCheck(this.player, obj);
	  }.bind(this));
	};
	
	
	BasicGame.prototype.collisionCheck = function (obj1, obj2) {
	// get the vectors to check against
	var xVector = (obj1.pos.x + (obj1.width / 2)) - (obj2.pos.x + (obj2.width / 2)),
	    yVector = (obj1.pos.y + (obj1.height / 2)) - (obj2.pos.y + (obj2.height / 2)),
	    // add the half widths and half heights of the objects
	    halfWidths = (obj1.width / 2) + (obj2.width / 2),
	    halfHeights = (obj1.height / 2) + (obj2.height / 2);
	
	// if the x and y vector are less than the half width or half height,
	// then we must be inside the object, causing a collision
	if (Math.abs(xVector) < halfWidths && Math.abs(yVector) < halfHeights) {
	    // figures out on which side we are colliding (top, bottom, left, or right)
	    var oX = halfWidths - Math.abs(xVector),
	        oY = halfHeights - Math.abs(yVector);
	
	    if (oX >= oY) {
	      if (yVector > 0) {
	        obj1.collisions.push([obj2, "top", oY]);
	        obj2.collision(obj1, "bottom", -oY);
	      } else {
	        obj1.collisions.push([obj2, 'bottom', -oY]);
	        obj2.collision(obj1, 'top', oY);
	      }
	    } else {
	      if (xVector > 0) {
	        obj1.collisions.push([obj2, "left", oX]);
	        obj2.collision(obj1, "right", -oX);
	      } else {
	        obj1.collisions.push([obj2, "right", -oX]);
	        obj2.collision(obj1, "left", oX);
	      }
	    }
	  } else {
	    obj2.collision(obj1);
	  }
	};
	
	BasicGame.prototype.startCountdown = function () {
	  if (this.countdownActive === false) {
	    this.uptickDeathCount();
	  }
	};
	
	BasicGame.prototype.uptickDeathCount = function () {
	  this.deathCount++;
	  this.deathTimer = window.setTimeout(this.uptickDeathCount.bind(this), 1000);
	};
	
	BasicGame.prototype.stopCountdown = function () {
	  window.clearTimeout(this.deathTimer);
	};
	
	BasicGame.prototype.enterDoor = function (door) {
	  if (door) {
	    this.switchRooms(
	      this.context,
	      door
	    );
	  }
	};
	
	module.exports = BasicGame;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var StaticObject = __webpack_require__(13);
	
	var Ladder = function (options) {
	  this.ladderId = options.ladderId;
	  StaticObject.call(this, options);
	};
	
	Util.inherits(Ladder, StaticObject);
	
	Ladder.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  this.context.fillStyle = "grey";
	  this.context.beginPath();
	  this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	Ladder.prototype.collision = function (obj, dir, oBump) {
	  if (dir) {
	    obj.onLadder[this.ladderId] = true;
	  } else {
	    obj.gravity = 0.80;
	    obj.onLadder[this.ladderId] = false;
	  }
	};
	
	module.exports = Ladder;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(6);
	
	var CreepingShroom = function (options) {
	  this.pos = { x: options.pos.x, y: options.pos.y };
	  this.height = options.height;
	  this.width = options.width;
	  this.growsToward = options.growsToward;
	  this.maxWidth = 800;
	  MovingObject.call(
	    this, options.context, this.pos.x, this.pos.y, null,
	    { height: 150, width: 60 }
	  );
	};
	
	Util.inherits(CreepingShroom, MovingObject);
	
	CreepingShroom.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  this.context.fillStyle = "purple";
	  this.context.beginPath();
	  this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	CreepingShroom.prototype.move = function () {
	  if (this.growsToward === 'right' && this.width <= this.maxWidth) {
	    this.height = this.height;
	    this.width += 0.5;
	  }
	};
	
	CreepingShroom.prototype.collision = function (obj, dir) {
	  if (dir) {
	    if (obj.velocity.x < 0){
	      obj.velocity.x = 5;
	    }
	    obj.pos.x += 1;
	  }
	};
	
	module.exports = CreepingShroom;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(3);
	var MovingObject = __webpack_require__(6);
	
	var ChasingEnemy = function (options) {
	  this.pos = { x: options.pos.x, y: options.pos.y };
	  this.height = options.height;
	  this.width = options.width;
	  this.activated = options.activated;
	  this.triggerId = options.triggerId;
	  this.targetX = null;
	  this.facing = 'l';
	  MovingObject.call(
	    this, options.context, this.pos.x, this.pos.y, null,
	    { height: 90, width: 40 }
	  );
	};
	
	Util.inherits(ChasingEnemy, MovingObject);
	
	ChasingEnemy.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  this.context.fillStyle = "pink";
	  this.context.beginPath();
	  this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	ChasingEnemy.prototype.move = function (target) {
	  if (this.activated) {
	    this.targetX = target.pos.x - this.width - this.pos.x + target.width;
	    if (this.targetX < -5) {
	      this.pos.x -= 5;
	      this.facing = 'l';
	    } else if (this.targetX >= 5) {
	      this.facing = 'l';
	      this.pos.x += 5;
	    } else {
	      this.pos.x += 0;
	    }
	  }
	};
	
	// ChasingEnemy.prototype.collision = function (obj, dir) {
	//   if (dir) {
	//     debugger;
	//   }
	// };
	
	module.exports = ChasingEnemy;


/***/ },
/* 31 */
/***/ function(module, exports) {

	var canvas = document.getElementById("canvas");
	
	var Menu = function (context, gameStartCallback) {
	  this.context = context;
	
	  var startButton = document.getElementById('start-game');
	  startButton.addEventListener('click', function () {
	    startButton.parentNode.removeChild(startButton);
	    gameStartCallback();
	  });
	
	  this.draw(context);
	};
	
	Menu.prototype.draw = function(context) {
	  this.clearBlack(context);
	
	  context.beginPath();
	  context.fillStyle = 'white';
	  context.font = 72 +"pt Arial ";
	  context.fillText('cordyceps', 280, 200);
	
	  context.fillRect(400, 400, 200, 100);
	
	  context.fillStyle = "black";
	  context.font = 30 +"pt Arial ";
	  context.fillText('start', 460, 460);
	
	  requestAnimationFrame(this.draw.bind(this, context));
	};
	
	Menu.prototype.clearBlack = function (context) {
	  context.beginPath();
	  context.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	module.exports = Menu;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map