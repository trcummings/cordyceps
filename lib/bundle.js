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

	var Menu = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementById("canvas");
	  var context = canvas.getContext('2d');
	
	  canvas.width = 1000;
	  canvas.height = 600;
	
	  new Menu(context, 'cordyceps', 'start');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var LevelSwitchUtil = __webpack_require__(2);
	var canvas = document.getElementById("canvas");
	
	var Menu = function (context, title, buttonText) {
	  this.context = context;
	
	  var startButton = document.getElementById('start-game');
	  startButton.addEventListener('click', function () {
	    this.button = startButton;
	    startButton.parentNode.removeChild(startButton);
	    LevelSwitchUtil.startGame(this.context, this);
	  }.bind(this));
	
	  this.drawStart(context, title, buttonText);
	};
	
	Menu.prototype.drawStart = function (context, title, buttonText) {
	  var titleX, buttonX;
	
	  this.clearBlack(context);
	
	  context.beginPath();
	  context.fillStyle = 'white';
	  context.font = 72 +"pt Arial ";
	  if (title === 'cordyceps') {
	    titleX = 280;
	  } else {
	    titleX = 170;
	  }
	
	  context.fillText(title, titleX, 200);
	
	  context.fillRect(400, 400, 200, 100);
	
	  context.fillStyle = "black";
	  context.font = 30 +"pt Arial ";
	  if (buttonText === 'start') {
	    buttonX = 460;
	  } else {
	    buttonX = 440;
	  }
	
	  context.fillText(buttonText, buttonX, 460);
	
	  this.animFrame = requestAnimationFrame(this.drawStart.bind(this, context, title, buttonText));
	};
	
	Menu.prototype.clearBlack = function (context) {
	  context.beginPath();
	  context.fillRect(0, 0, canvas.width, canvas.height);
	};
	
	Menu.prototype.drawEnd = function (context) {
	  cancelAnimationFrame(this.animFrame);
	  this.clearBlack(context);
	
	  document.getElementsByTagName('div')[0].appendChild(this.button);
	
	  new Menu(context, 'please try again', 'it hurts');
	};
	
	module.exports = Menu;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var LevelOne = __webpack_require__(3);
	var LevelTwo = __webpack_require__(28);
	var GameView = __webpack_require__(30);
	
	var LevelSwitchUtil = {
	  startGame: function (context, menu) {
	    LevelSwitchUtil.menu = menu;
	    var levelOne = new LevelOne(
	      context,
	      LevelSwitchUtil.goToLevelTwo,
	      LevelSwitchUtil.endGame
	    );
	    LevelSwitchUtil.gameView = new GameView(levelOne);
	    LevelSwitchUtil.gameView.start();
	  },
	
	  goToLevelTwo: function (context) {
	    var levelTwo = new LevelTwo(
	      context,
	      function () {
	        // level 3 callback goes here
	      },
	      LevelSwitchUtil.endGame
	    );
	    LevelSwitchUtil.gameView = new GameView(levelTwo);
	    LevelSwitchUtil.gameView.start();
	  },
	
	  endGame: function (level, context) {
	    LevelSwitchUtil.gameView.isOver = true;
	    cancelAnimationFrame(LevelSwitchUtil.gameView.animFrame);
	    LevelSwitchUtil.menu.drawEnd(context);
	  }
	};
	
	module.exports = LevelSwitchUtil;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var BasicGame = __webpack_require__(5);
	var RoomOne = __webpack_require__(17);
	var RoomTwo = __webpack_require__(25);
	var RoomThree = __webpack_require__(26);
	var RoomFour = __webpack_require__(27);
	
	var LevelOne = function (context, endLevel, endGame) {
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
	    },
	    endLevel,
	    endGame
	  );
	};
	
	ObjectUtil.inherits(LevelOne, BasicGame);
	
	module.exports = LevelOne;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var ObjectUtil = {
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
	
	
	module.exports = ObjectUtil;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(6);
	var Camera = __webpack_require__(15);
	var Trigger = __webpack_require__(13);
	var Ramp = __webpack_require__(11);
	var Door = __webpack_require__(16);
	var canvas = document.getElementById("canvas");
	
	var BasicGame = function (context, options, endLevel, endGame) {
	  // options has: initialRoom, rooms
	  this.endLevel = endLevel;
	  this.endGameCB = endGame;
	  this.options = options;
	  this.deathCount = 0;
	  this.countdownActive = false;
	  this.specialRenders = [];
	  this.topRenders = [];
	  this.cutsceneTimers = [];
	  this.crazyColor = 'black';
	  this.eventIds = [];
	
	  this.particles = [];
	  this.tick = 0;
	  this.particlesOn = false;
	
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
	
	  if (this.particlesOn) {
	    this.createParticles();
	    this.updateParticles();
	    this.killParticles();
	  }
	
	  this.draw();
	};
	
	BasicGame.prototype.moveObjects = function () {
	  this.camera.move(this.cameraTarget);
	  this._movingObjects.forEach(function (obj) {
	    obj.move(this.player);
	  }.bind(this));
	  this.player.move();
	};
	
	BasicGame.prototype.draw = function() {
	  var _allObjects = this._staticObjects.concat(this._movingObjects).concat([this.player]);
	  this.clearBlack();
	
	  if (this.countdownActive) {
	    this.crazyBackground();
	  }
	
	  if (this.particlesOn) {
	    this.drawParticles();
	  }
	
	  _allObjects.forEach(function (obj) {
	    obj.render(this.camera);
	  }.bind(this));
	
	  this.specialRenders.forEach(function (render) {
	    render();
	  });
	
	  this.topRenders.forEach(function (obj) {
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
	
	BasicGame.prototype.crazyBackground = function () {
	  var context = this.context;
	  var camera = this.camera;
	  // x, y, width, height
	
	  if (!this.colorInterval) {
	    this.colorInterval = setInterval(function () {
	      this.crazyColor = '#' + Math.random().toString(16).substr(-6);
	    }.bind(this), 80);
	  }
	
	  context.globalAlpha = (this.deathCount + 1) / 200;
	  // context.globalAlpha = 0.3;
	  context.fillStyle = this.crazyColor;
	  context.fillRect(0, 0, camera.width, camera.height);
	  context.globalAlpha = 1;
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
	    this.countdownActive = true;
	    this.uptickDeathCount();
	  }
	};
	
	BasicGame.prototype.uptickDeathCount = function () {
	  this.deathCount++;
	  if (this.deathCount === 100) {
	    this.endGameCB(this, this.context);
	  }
	  this.deathTimer = window.setTimeout(this.uptickDeathCount.bind(this), 1000);
	};
	
	BasicGame.prototype.stopCountdown = function () {
	  window.clearTimeout(this.deathTimer);
	  this.deathCount = 0;
	  this.countdownActive = false;
	};
	
	BasicGame.prototype.enterDoor = function (door) {
	  if (door) {
	    this.switchRooms(
	      this.context,
	      door
	    );
	  }
	};
	
	BasicGame.prototype.endLevel = function () {
	  this.endLevelCallback(this.context);
	};
	
	BasicGame.prototype.endGame = function () {
	  this.cutsceneTimers.forEach(function (timer) {
	    window.clearTimeout(timer);
	  });
	  this.endGameCB(this, this.context);
	};
	
	BasicGame.prototype.playLockedDoorClick = function () {
	  console.log('click');
	};
	
	
	
	BasicGame.prototype.createParticles = function () {
	  //check on every 10th tick check
	  if(this.tick % 10 === 0) {
	      if(this.particles.length < 1000) {
	          this.particles.push({
	            x: Math.random()*this.width, //between 0 and canvas width
	            y: 0,
	            speed: 2+Math.random()*3, //between 2 and 5
	            radius: 5+Math.random()*5, //between 5 and 10
	            color: 'yellow',
	          });
	      }
	  }
	};
	
	BasicGame.prototype.drawParticles = function () {
	  for(var i in this.particles) {
	      var part = this.particles[i];
	      this.context.beginPath();
	      this.context.arc(
	        part.x - this.camera.cpos.x,
	        part.y - this.camera.cpos.y,
	        part.radius, 0, Math.PI*2);
	      this.context.closePath();
	      if (this.deathCount > 30) {
	        part.color = 'white';
	      } else {
	        part.color = 'yellow';
	      }
	
	      // if (this.deathCount > 10) {
	      //   part.color = 'white';
	      //
	      //   var trails = this.deathCount / 10;
	      //   part.y += 10 * trails;
	      //   for (var x = 0; x < trails; x++) {
	      //     this.context.globalAlpha = 1 / trails + 1;
	      //     this.context.fillStyle = part.color;
	      //     this.context.fill();
	      //     part.y -= 5 * i;
	      //   }
	      //   this.context.globalAlpha = 1;
	      //   //
	      //   // part.y -= 10;
	      //   // this.context.globalAlpha = 0.30;
	      //   // this.context.fillStyle = part.color;
	      //   // this.context.fill();
	      //   // part.y += 5;
	      //   // this.context.globalAlpha = 0.60;
	      //   // this.context.fillStyle = part.color;
	      //   // this.context.fill();
	      //   // part.y += 5;
	      //   // this.context.globalAlpha = 1;
	      // }
	      this.context.fillStyle = part.color;
	      this.context.fill();
	  }
	};
	
	BasicGame.prototype.updateParticles = function () {
	  for(var i in this.particles) {
	      var part = this.particles[i];
	      part.y += part.speed;
	  }
	};
	
	BasicGame.prototype.killParticles = function () {
	  for(var i in this.particles) {
	      var part = this.particles[i];
	      if(part.y > this.height) {
	          part.y = 0;
	      }
	  }
	};
	
	module.exports = BasicGame;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var SpriteUtil = __webpack_require__(7);
	var MovingObject = __webpack_require__(8);
	
	var Player = function (context, startX, startY, jumpHeight) {
	  var image = new Image();
	
	  this.hidden = false;
	  this.sprite = {
	    image: image,
	    frameIdx: 0
	  };
	
	  MovingObject.call(
	    this, context, startX, startY, jumpHeight,
	    { height: 80, width: 30 }
	  );
	};
	
	ObjectUtil.inherits(Player, MovingObject);
	
	Player.prototype.render = function (camera) {
	  if (!this.hidden) {
	    var xPos = this.pos.x - camera.cpos.x;
	    var yPos = this.pos.y - camera.cpos.y;
	
	    var spriteOptions = SpriteUtil.player.spriteChoice(this);
	
	    this.sprite.image.src = spriteOptions.url;
	    this.sprite.height = spriteOptions.height;
	    this.sprite.width = spriteOptions.width;
	    this.sprite.numFrames = spriteOptions.numFrames;
	    this.sprite.sY = spriteOptions.sY;
	
	    SpriteUtil.updateFrame(this);
	
	    SpriteUtil.render({
	      sprite: this.sprite,
	      context: this.context,
	      orientation: SpriteUtil.player.orientation,
	      xPos: xPos - this.width - 5,
	      yPos: yPos - this.sprite.height + this.height + 10,
	      obj: this
	    });
	  }
	};
	
	module.exports = Player;


/***/ },
/* 7 */
/***/ function(module, exports) {

	var SpriteUtil = {
	  player: {
	    r: {
	      jumping: { url: '', numFrames: 1},
	      falling: { url: '', numFrames: 1},
	      running: {
	        numFrames: 8,
	        sY: 100,
	        width: 800
	      },
	      standing: {
	        numFrames: 1,
	        sY: 400,
	        width: 100
	      }
	    },
	    l: {
	      jumping: { url: '', numFrames: 1},
	      falling: { url: '', numFrames: 1},
	      running: {
	        numFrames: 8,
	        sY: 0,
	        width: 800
	      },
	      standing: {
	        numFrames: 1,
	        sY: 300,
	        width: 100
	      }
	    },
	    ladder: {
	      up: {
	        numFrames: 8,
	        sY: 500,
	        width: 800
	      },
	      down: {
	        numFrames: 8,
	        sY: 600,
	        width: 800
	      },
	      neither: {
	        numFrames: 1,
	        sY: 500,
	        width: 100
	      }
	    },
	    height: 700,
	    width: 900,
	    orientation: 'landscape',
	
	    spriteChoice: function (playerContext) {
	      // note: turn playerContext into an options hash instead
	      var player = SpriteUtil.player;
	      var width;
	      var numFrames;
	
	      if (playerContext.currentlyOnLadder() &&
	          playerContext.goingDown &&
	          playerContext.velocity.y === 0) {
	        var laddr = player.ladder;
	
	        if (playerContext.goingDown === 'up') {
	          numFrames = laddr.up.numFrames;
	          sY = laddr.up.sY;
	          width = laddr.up.width;
	        } else if (playerContext.goingDown === 'down') {
	          numFrames = laddr.down.numFrames;
	          sY = laddr.down.sY;
	          width = laddr.down.width;
	        } else {
	          numFrames = laddr.neither.numFrames;
	          sY = laddr.neither.sY;
	          width = laddr.neither.width;
	        }
	      } else {
	        if (playerContext.facing === 'r') {
	          var r = player.r;
	
	          if (playerContext.jumping) {
	            numFrames = r.standing.numFrames; // CHANGE ASAP
	            sY = r.standing.sY;
	            width = r.standing.width;
	
	          } else if (playerContext.velocity.x > 1) {
	            numFrames = r.running.numFrames;
	            sY = r.running.sY;
	            width = r.running.width;
	
	          } else {
	            numFrames = r.standing.numFrames;
	            sY = r.standing.sY;
	            width = r.standing.width;
	          }
	        } else if (playerContext.facing === 'l') {
	          var l = player.l;
	
	          if (playerContext.jumping) {
	            numFrames = l.standing.numFrames; // CHANGE ASAP
	            sY = l.standing.sY;
	            width = l.standing.width;
	
	          } else if (playerContext.velocity.x < -1) {
	            numFrames = l.running.numFrames;
	            sY = l.running.sY;
	            width = l.running.width;
	
	          } else {
	            numFrames = l.standing.numFrames;
	            sY = l.standing.sY;
	            width = l.standing.width;
	          }
	        }
	      }
	      // if player velocity 0, if player going up, if player going down
	
	
	
	      return {
	        url: 'lib/sprites/player/player1sheet.png',
	        numFrames: numFrames,
	        sY: sY,
	        height: 100,
	        width: width
	      };
	    },
	
	    standUpSprite: function () {
	      var image = new Image();
	      var sprite = {
	        image: image,
	        numFrames: 9,
	        height: 100,
	        width: 900
	      };
	
	      sprite.image.src = 'lib/sprites/player/player1sheet.png';
	
	      return sprite;
	    }
	  },
	
	  levelOneRoomThreeEnemy: {
	    upright: {
	      src: 'lib/sprites/level1/enemyspritesheet.png',
	      r: {
	        running: {
	          sY: 100
	        },
	        standingStill: {
	          sY: 300
	        }
	      },
	      l: {
	        running: {
	          sY: 0
	        },
	        standingStill: {
	          sY: 200
	        }
	      },
	      numFrames: 6,
	      width: 600,
	      height: 100
	    },
	    crushed: {
	      src: '',
	      numFrames: 6,
	      width: 600,
	      height: 100
	    }
	  },
	
	  render: function (options) {
	    var image, sX, sY, sWidth, sHeight,
	    dWidth, dHeight, numFrames, sprite;
	
	    sprite = options.sprite;
	    image = sprite.image;
	    sHeight = sprite.height;
	    sWidth = sprite.width;
	    numFrames = sprite.numFrames;
	
	    if (options.orientation == 'portrait') {
	      sX = 0;
	      sY = sprite.frameIdx * sHeight / numFrames;
	      sHeight = sHeight / numFrames;
	      dWidth = sWidth;
	      dHeight = sHeight;
	
	    } else if (options.orientation == 'landscape') {
	      if (sprite.sY) {
	        sY = sprite.sY;
	      } else {
	        sY = 0;
	      }
	
	      sX = sprite.frameIdx * sWidth / numFrames;
	      sWidth = sWidth / numFrames;
	      dHeight = sHeight;
	      dWidth = sWidth;
	    }
	
	    options.context.drawImage(
	      image, sX, sY, sWidth, sHeight,
	      options.xPos, options.yPos,
	      dWidth, dHeight
	    );
	  },
	
	  updateFrame: function (that) {
	    if(!that.interval) {
	      that.interval = window.setInterval(function () {
	        that.sprite.frameIdx++;
	        that.sprite.frameIdx = that.sprite.frameIdx % that.sprite.numFrames;
	        // if (that.sprite.frameIdx >= that.sprite.numFrames - 1) {
	        //   that.sprite.frameIdx = 0;
	        // }
	      }.bind(that), 80);
	    }
	  }
	};
	
	
	
	
	// function (player) {
	//
	// };
	//
	// if (this.facing == "r") {
	//   this.sprite.img.src = 'lib/sprites/playerspriterightrunning1.png';
	// } else {
	//   this.sprite.img.src = 'lib/sprites/playerspriteleftrunning1.png';
	// }
	//
	// if(!this.interval) {
	//   this.interval = window.setInterval(function () {
	//     if (!this.jumping && (this.velocity.x > 2 || this.velocity.x < -2)) {
	//       if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
	//         this.sprite.frameIdx = 0;
	//       }
	//       this.sprite.frameIdx++;
	//     } else {
	//       this.sprite.frameIdx = 7;
	//     }
	//   }.bind(this), 80);
	// }
	
	
	
	module.exports = SpriteUtil;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(9);
	var Ramp = __webpack_require__(11);
	var Shroom = __webpack_require__(12);
	var Trigger = __webpack_require__(13);
	var Ladder = __webpack_require__(14);
	
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
	
	  this.grounded = false;
	  this.jumping = false;
	  this.facing = "r";
	
	  this.lastYpos = null;
	
	  this.gravity = 0.80;
	  this.friction = 0.90;
	  this.maxVel = 20;
	
	  this.inputDisabled = false;
	};
	
	MovingObject.prototype.processInteraction = function (game) {
	  if (this.onDoor) {
	    for (var doorName in this.onDoor) {
	      if (this.onDoor.hasOwnProperty(doorName)) {
	        if (this.onDoor[doorName]) {
	          if (this.onDoor[doorName].locked) {
	            game.playLockedDoorClick();
	          } else {
	            game.enterDoor(this.onDoor[doorName]);
	          }
	        }
	      }
	    }
	  }
	};
	
	MovingObject.prototype.processInput = function (dir) {
	  for (var ladderId in this.onLadder) {
	    if (this.onLadder.hasOwnProperty(ladderId)) {
	      if (this.onLadder[ladderId]) {
	        this.gravity = 0;
	        this.velocity.y = 0;
	        this.moveOnLadder(dir);
	      }
	    }
	  }
	
	  if (!this.currentlyOnLadder()) {
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
	    this.pos.y -= 4;
	  } else if (dir === 'down') {
	    this.pos.y += 4;
	  }
	  this.goingDown = dir;
	};
	
	MovingObject.prototype.jump = function () {
	  if (!this.jumping && this.grounded) {
	    this.jumping = true;
	    this.grounded = false;
	    this.pos.y -= 5;
	    this.velocity.y = this.jumpHeight;
	  }
	};
	
	MovingObject.prototype.currentlyOnLadder = function () {
	  for (var ladderId in this.onLadder) {
	    if (this.onLadder.hasOwnProperty(ladderId)) {
	      if (this.onLadder[ladderId]) {
	        return true;
	      }
	    }
	  }
	  return false;
	};
	
	MovingObject.prototype.move = function () {
	  // run collision callbacks and clear array
	
	  this.grounded = false;
	
	  // console.log([this.pos.x, this.pos.y]);
	
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
	
	  if (this.lastYpos === this.pos.y && this.currentlyOnLadder()) {
	    this.goingDown = 'no';
	    this.velocity.y = 0;
	  }
	
	  this.lastYpos = this.pos.y;
	
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
	    if (this.goingDown !== 'down') {
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
	  this.velocity.y = -30;
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Box = function (options) {
	  this.boxId = options.boxId;
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Box, StaticObject);
	
	module.exports = Box;


/***/ },
/* 10 */
/***/ function(module, exports) {

	var StaticObject = function (options) {
	  this.pos = { x: options.pos.x, y: options.pos.y }; // camera position vector center
	  this.context = options.context;
	  this.width = options.width;
	  this.height = options.height;
	
	  if (options.img) {
	    this.image = new Image();
	    this.image.src = options.img;
	  }
	};
	
	StaticObject.prototype.collision = function () {
	  // don't do anything
	};
	
	StaticObject.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
	  //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
	  // debugger;
	  if (this.image) {
	    this.context.drawImage(this.image, newX - 10, newY - 10);
	  } else {
	    this.context.fillStyle = "#1F2224";
	    this.context.beginPath();
	    this.context.fillRect(newX, newY, this.width, this.height);
	  }
	
	  // }
	};
	
	module.exports = StaticObject;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Ramp = function (options) {
	    this.slant = options.slant;
	    this.rampX = undefined;
	    this.rampY = undefined;
	
	    StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Ramp, StaticObject);
	
	// Slant nomenclature
	  // bl-tr bottom line and right line
	  // br-tl bottom line and left line
	  // tl-br top line and right line
	  // tr-bl top line and left line
	
	Ramp.prototype.render = function (camera) {
	//   this.rampX = this.pos.x - camera.cpos.x;
	//   this.rampY = this.pos.y - camera.cpos.y;
	//
	//
	//
	//
	//
	//
	//   this.context.fillStyle = "brown";
	//   this.context.beginPath();
	//
	//   // context.fillRect(rampX, rampY, this.width, this.height);
	//
	//   if (this.slant === 'bl-tr') {
	//     // move to bottom left
	//     this.context.moveTo(this.rampX, this.rampY + this.height);
	//
	//     // line to to top right
	//     this.context.lineTo(this.width + this.rampX, this.rampY + this.height);
	//
	//     // line to to bottom right
	//     this.context.lineTo(this.rampX + this.width, this.rampY);
	//     this.context.fill();
	//   }
	//
	//   if (this.slant === 'tl-br') {
	//     // get in position
	//     this.context.moveTo(this.rampX, this.rampY);
	//
	//     // vertical line to bottom left
	//     this.context.lineTo(this.rampX, this.rampY + this.height);
	//
	//     // horizontal line to bottom right
	//     this.context.lineTo(this.rampX + this.width, this.rampY + this.height);
	//
	//     this.context.fill();
	//   }
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Shroom = function (options) {
	  this.boost = options.boost;
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Shroom, StaticObject);
	
	Shroom.prototype.collision = function () {
	  // doesn't do shit
	};
	
	// Shroom.prototype.render = function (camera) {
	//   var newX = this.pos.x - camera.cpos.x;
	//   var newY = this.pos.y - camera.cpos.y;
	//
	//   // if ((newX >= camera.cullDistX.left && newX <= camera.cullDistX.right) &&
	//   //     (newY >= camera.cullDistY.top  && newY <= camera.cullDistY.bottom)) {
	//
	//     this.context.fillStyle = "green";
	//     this.context.beginPath();
	//     this.context.fillRect(newX, newY, this.width, this.height);
	//   // }
	// };
	
	module.exports = Shroom;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Trigger = function (options) {
	  this.activate = options.activate;
	  this.notActivated = true;
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Trigger, StaticObject);
	
	Trigger.prototype.render = function () {
	  // dont do shit
	};
	
	module.exports = Trigger;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Ladder = function (options) {
	  this.ladderId = options.ladderId;
	  this.ladderTop = new Image();
	  this.ladderBottom = new Image();
	  this.ladderMid = new Image();
	
	  this.ladderTop.src = 'lib/sprites/ladder/laddertop.png';
	  this.ladderBottom.src = 'lib/sprites/ladder/ladderbottom.png';
	  this.ladderMid.src = 'lib/sprites/ladder/laddermid.png';
	
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Ladder, StaticObject);
	
	Ladder.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	  var midsections = Math.round(this.height / 10) - 2;
	
	  // top
	  this.context.drawImage(this.ladderTop, newX - 10, newY - 10);
	
	  for (var i = 1; i < midsections; i++) {
	    this.context.drawImage(this.ladderMid, newX - 10, (newY + 10 * i - 15));
	  }
	
	  // bottom
	  this.context.drawImage(this.ladderBottom, newX - 10, newY + this.height - 35);
	
	  // this.context.fillStyle = "grey";
	  // this.context.beginPath();
	  // this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	Ladder.prototype.collision = function (obj, dir, oBump) {
	  if (dir) {
	    obj.onLadder[this.ladderId] = true;
	  } else {
	    obj.onLadder[this.ladderId] = false;
	
	    for (var ladderId in obj.onLadder) {
	      if (obj.onLadder.hasOwnProperty(ladderId)) {
	        if (obj.onLadder[ladderId]) {
	          obj.gravity = 0;
	          return;
	        }
	      }
	    }
	    obj.gravity = 0.80;
	  }
	};
	
	module.exports = Ladder;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	
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
	
	  this.lowFollow = true;
	
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
	  if (this.lowFollow) {
	    this.target.y = targetObj.pos.y - (this.height / 1.3); // same but with y
	  } else {
	    this.target.y = targetObj.pos.y - (1 * this.height / 4);
	  }
	
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
	  ObjectUtil.verletTransform(this);
	
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
	
	
	Camera.prototype.startHallwaySquash = function (desiredHeight) {
	  // this.hallwaySquash(player);
	  this.hallwaySquash(desiredHeight);
	};
	
	Camera.prototype.startHallwayWiden = function (desiredHeight) {
	  // this.hallwaySquash(player);
	  this.hallwayWiden(desiredHeight);
	};
	
	Camera.prototype.hallwaySquash = function (desiredHeight) {
	  if (this.height >= desiredHeight) {
	    // if (player.velocity.x > 0.5) {
	      this.height -= 5;
	    // }
	  }
	  // else if (this.height <= this.world.height) {
	  //   if (player.velocity.x < -0.5) {
	  //     this.height += 0.2;
	  //   }
	  // }
	
	  this.squashCam = window.setTimeout(this.hallwaySquash.bind(this, desiredHeight), 60);
	};
	
	Camera.prototype.hallwayWiden = function (desiredHeight) {
	  if (this.height <= desiredHeight) {
	    this.height += 5;
	  }
	
	  this.squashCam = window.setTimeout(this.hallwayWiden.bind(this, desiredHeight), 60);
	};
	
	Camera.prototype.endHallwaySquash = function () {
	  window.clearTimeout(this.squashCam);
	};
	
	Camera.prototype.endHallwayWiden = function () {
	  window.clearTimeout(this.squashCam);
	};
	
	Camera.prototype.followLow = function () {
	  this.lowFollow = true;
	};
	
	Camera.prototype.followHigh = function () {
	  this.lowFollow = false;
	};
	
	module.exports = Camera;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Door = function (options) {
	  this.doorPath = options.doorPath;
	  this.image = new Image();
	  this.image.src = 'lib/sprites/labdoor1.png';
	
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Door, StaticObject);
	
	Door.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  this.context.drawImage(this.image, newX - 10, newY - 10);
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var ObjectUtil = __webpack_require__(4);
	
	var RoomOne = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 500,
	    width: 750,
	    playerJump: -10,
	    playerX: 620,
	    playerY: 420,
	    doorCoords: doorCoords,
	    img: 'lib/sprites/level1/room1/bg.png',
	    sprite: {
	      height: 500,
	      width: 750
	    }
	  });
	
	  this.initiate();
	};
	
	ObjectUtil.inherits(RoomOne, BasicRoom);
	
	RoomOne.prototype.initiate = function () {
	  var worldContext = this;
	  var path = this.PathUtil.inLevelOne;
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 60, y : this.height - 115 },
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
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 620, y : this.height - 100 },
	    context : this.game.context,
	    width: 200,
	    height: 100,
	    eventId: 1,
	    activate: function () {
	      if (this.notActivated && worldContext.game.eventIds.indexOf(this.eventId) === -1) {
	        var ctxt = worldContext.game;
	        worldContext.game.eventIds.push(this.eventId);
	        worldContext.CutsceneUtil.levelOneRoomOneScene(ctxt);
	        this.notActivated = false;
	      }
	    }
	  }));
	};
	
	module.exports = RoomOne;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Box = __webpack_require__(9);
	var StaticObject = __webpack_require__(10);
	var Trigger = __webpack_require__(13);
	var Ramp = __webpack_require__(11);
	var Door = __webpack_require__(16);
	var Shroom = __webpack_require__(12);
	var CreepingShroom = __webpack_require__(19);
	var ChasingEnemy = __webpack_require__(20);
	var Ladder = __webpack_require__(14);
	var TextOverlay = __webpack_require__(21);
	var Decorative = __webpack_require__(22);
	var PathUtil = __webpack_require__(23);
	var CutsceneUtil = __webpack_require__(24);
	
	
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
	    //bg
	    new Decorative({
	      pos : { x : 0, y : 0 },
	      context : this.game.context,
	      img: options.img,
	      animated: false,
	      height: this.height,
	      width: this.width
	    }),
	
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
	      boxId: 'bottom'
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
	
	BasicRoom.prototype.StaticObject = StaticObject;
	BasicRoom.prototype.Box = Box;
	BasicRoom.prototype.Trigger = Trigger;
	BasicRoom.prototype.Ramp = Ramp;
	BasicRoom.prototype.Door = Door;
	BasicRoom.prototype.Shroom = Shroom;
	BasicRoom.prototype.CreepingShroom = CreepingShroom;
	BasicRoom.prototype.ChasingEnemy = ChasingEnemy;
	BasicRoom.prototype.TextOverlay = TextOverlay;
	BasicRoom.prototype.Ladder = Ladder;
	BasicRoom.prototype.Decorative = Decorative;
	BasicRoom.prototype.PathUtil = PathUtil;
	BasicRoom.prototype.CutsceneUtil = CutsceneUtil;
	
	module.exports = BasicRoom;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var MovingObject = __webpack_require__(8);
	
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
	
	ObjectUtil.inherits(CreepingShroom, MovingObject);
	
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var SpriteUtil = __webpack_require__(7);
	var MovingObject = __webpack_require__(8);
	
	var ChasingEnemy = function (options) {
	  this.pos = { x: options.pos.x, y: options.pos.y };
	  this.height = options.height;
	  this.width = options.width;
	  this.callback = options.callback;
	  this.activated = options.activated;
	  this.triggerId = options.triggerId;
	  this.targetX = null;
	  this.facing = 'l';
	  this.game = options.game;
	  this.speed = 5;
	
	  this.imgOptions = options.imgOptions;
	  this.sprite = {
	    image: new Image(),
	    frameIdx: 0
	  };
	  this.sprite.image.src = options.imgOptions.src;
	
	  MovingObject.call(
	    this, options.context, this.pos.x, this.pos.y, null,
	    { height: 90, width: 40 }
	  );
	};
	
	ObjectUtil.inherits(ChasingEnemy, MovingObject);
	
	ChasingEnemy.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	
	  this.sprite.height = this.imgOptions.height;
	  this.sprite.width = this.imgOptions.width;
	  this.sprite.numFrames = this.imgOptions.numFrames;
	
	  // console.log(this.velocity.x);
	
	  // if (this.facing === 'r') {
	  //   if (this.velocity.x > 1) {
	  //     this.sprite.sY = this.imgOptions.r.running.sY;
	  //   } else {
	  //     this.sprite.sY = this.imgOptions.r.standingStill.sY;
	  //   }
	  // } else if (this.facing === 'l') {
	  //   if (this.velocity.x < -1) {
	  //     this.sprite.sY = this.imgOptions.l.running.sY;
	  //   } else {
	  //     this.sprite.sY = this.imgOptions.l.standingStill.sY;
	  //   }
	  // }
	
	  SpriteUtil.updateFrame(this);
	
	  SpriteUtil.render({
	    sprite: this.sprite,
	    context: this.context,
	    orientation: 'landscape',
	    xPos: newX - this.width - 5,
	    yPos: newY - this.sprite.height + this.height + 10,
	    obj: this
	  });
	
	  // this.context.fillStyle = "pink";
	  // this.context.beginPath();
	  // this.context.fillRect(newX, newY, this.width, this.height);
	};
	
	ChasingEnemy.prototype.move = function (target) {
	  if (this.activated) {
	    this.targetX = target.pos.x - this.width - this.pos.x + target.width;
	    if (this.targetX < -5) {
	      this.sprite.sY = this.imgOptions.l.running.sY;
	      this.pos.x -= this.speed;
	      this.facing = 'l';
	    } else if (this.targetX >= 5) {
	      this.facing = 'r';
	      this.sprite.sY = this.imgOptions.r.running.sY;
	      this.pos.x += this.speed;
	    } else {
	      this.pos.x += 0;
	      if (this.facing === 'r') {
	        this.sprite.sY = this.imgOptions.r.standingStill.sY;
	      } else if (this.facing === 'l') {
	        this.sprite.sY = this.imgOptions.l.standingStill.sY;
	      }
	    }
	  }
	};
	
	ChasingEnemy.prototype.collision = function (obj, dir) {
	  if (dir) {
	    this.game.endGame();
	  }
	};
	
	module.exports = ChasingEnemy;


/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var StaticObject = __webpack_require__(10);
	
	var Decorative = function (options) {
	  this.context = options.context;
	  this.image = new Image();
	  this.image.src = options.img;
	  this.sprite = options.sprite;
	  this.activated = options.activated;
	  this.animated = options.animated;
	  this.decorativeId = options.decorativeId;
	  this.orientation = options.orientation;
	
	  StaticObject.call(this, options);
	};
	
	ObjectUtil.inherits(Decorative, StaticObject);
	
	Decorative.prototype.render = function (camera) {
	  var newX = this.pos.x - camera.cpos.x;
	  var newY = this.pos.y - camera.cpos.y;
	
	  if (this.image.src !== 'noimage') {
	    if (this.animated) {
	      if(!this.interval) {
	        this.interval = window.setInterval(function () {
	          if (this.activated) {
	            if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
	              this.sprite.frameIdx = 3;
	            } else {
	              this.sprite.frameIdx++;
	            }
	          } else {
	            this.sprite.frameIdx = 0;
	          }
	        }.bind(this), 150);
	      }
	
	      if (this.orientation === 'portrait') {
	        this.context.drawImage(
	          this.image,
	          this.sprite.frameIdx * this.sprite.width / this.sprite.numFrames,
	          0,
	          this.sprite.width / this.sprite.numFrames,
	          this.sprite.height,
	          newX - this.width - 5,
	          newY - this.sprite.height + this.height + 10,
	          this.sprite.width / this.sprite.numFrames,
	          this.sprite.height
	        );
	      } else if (this.orientation === 'landscape') {
	        this.context.drawImage(
	          this.image,
	          0,
	          this.sprite.frameIdx * this.sprite.height / this.sprite.numFrames,
	          this.sprite.width,
	          this.sprite.height / this.sprite.numFrames,
	          newX + 10,
	          newY - 5,
	          this.sprite.width,
	          this.sprite.height / this.sprite.numFrames
	        );
	      }
	    } else {
	      this.context.drawImage(this.image, newX - 10, newY - 10);
	    }
	  } else {
	    this.context.fillStyle = "#1F2224";
	    this.context.beginPath();
	    this.context.fillRect(newX, newY, this.width, this.height);
	  }
	
	
	
	};
	
	Decorative.prototype.collision = function () {
	
	};
	
	module.exports = Decorative;


/***/ },
/* 23 */
/***/ function(module, exports) {

	var PathUtil = {
	  inLevelOne: {
	    fromRoomOne: {
	      toRoomTwo: { x: 120, y: 670 }
	    },
	    fromRoomTwo: {
	      toRoomOne: { x: 70, y: 420 },
	      toRoomThree: { x: 70, y: 470 }
	    },
	    fromRoomThree: {
	      toRoomTwo: { x: 1890, y: 220 },
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

	var SpriteUtil = __webpack_require__(7);
	var TextOverlay = __webpack_require__(21);
	
	var CutsceneUtil = {
	  levelOneRoomOneScene: function (game) {
	    var layingInterval;
	
	    game.player.inputDisabled = true;
	    game.player.facing = 'l';
	    game.camera.height = 200;
	    game.player.hidden = true;
	    game.clearBlack();
	
	    var sprite = SpriteUtil.player.standUpSprite();
	
	    setTimeout(function () {
	      game.clearBlack();
	
	      game.camera.endHallwaySquash();
	      game.camera.startHallwayWiden(350);
	
	      layingInterval = setInterval(function () {
	        game.specialRenders.push(function () {
	          game.context.drawImage(
	            sprite.image, 0, 200, 100, 100,
	            game.player.pos.x - game.player.width - 5,
	            game.player.pos.y - sprite.height - game.player.height + 35,
	            100, 100
	          );
	        });
	      }, 80);
	
	      var i = 0;
	      var standingInterval;
	
	      setTimeout(function () {
	        clearInterval(layingInterval);
	
	        standingInterval = setInterval(function () {
	          game.specialRenders = [];
	
	          game.specialRenders.push(function () {
	            game.context.drawImage(
	              sprite.image, 100 * i, 200, 100, 100,
	              game.player.pos.x - game.player.width - 5,
	              game.player.pos.y - sprite.height - game.player.height + 35,
	              100, 100
	            );
	          });
	
	          i++;
	        }, 100);
	      }, 5000);
	
	      setTimeout(function () {
	        game.specialRenders = [];
	        clearInterval(standingInterval);
	        clearInterval(layingInterval);
	        game.camera.endHallwayWiden();
	        game.camera.startHallwayWiden(500);
	        game.player.inputDisabled = false;
	        game.player.hidden = false;
	      }, 5900);
	
	    }, 500);
	  },
	
	  levelOneRoomFourScene: function (options) { //callback1, callback2, worldContext) {
	    var room = options.worldContext;
	    // squash the scene for DRAMA
	    options.callback1(400);
	
	    var mook = new options.chasingEnemy({
	      pos : { x : 50, y : 400 },
	      game: room.game,
	      context : room.game.context,
	      width: 100,
	      height: 100,
	      activated: true,
	      triggerId: 2,
	      imgOptions: SpriteUtil.levelOneRoomThreeEnemy.upright
	    });
	
	    room.game._movingObjects.push(mook);
	    room._movingObjects.push(mook);
	    mook.speed = 0.5;
	
	    setTimeout(function () {
	      mook.speed = 0;
	      mook.activated = false;
	      room.game.particlesOn = true;
	    }, 6000);
	
	
	    // wait the appropriate amount of time
	    var timeOutOne = setTimeout(function () {
	      var bottomBox = room.modifyObject('staticObject', 'boxId', 'bottom');
	      room.game._staticObjects[bottomBox.index].width = 450;
	      // room.game._staticObjects.splice(bottomBox.index, 1);
	
	      // close it out after a little
	      var timeOutTwo = setTimeout(function () {
	        options.callback1(0);
	        setTimeout(function () {
	          options.callback2();
	        }, 3000);
	        // game.clearBlack();
	      }, 300);
	
	      room.game.cutsceneTimers.push(timeOutTwo);
	    }, 8000);
	
	    room.game.cutsceneTimers.push(timeOutOne);
	  }
	};
	
	module.exports = CutsceneUtil;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// notable events: cave in at left of room, locked door at bottom right
	//   ladder, leading up to door to room 3.
	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var ObjectUtil = __webpack_require__(4);
	
	var RoomTwo = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 750,
	    width: 2000,
	    playerJump: -10,
	    playerStartX: 1200,
	    playerStartY: 670,
	    doorCoords: doorCoords,
	    img: 'lib/sprites/level1/room2/bg.png'
	  });
	
	  this.initiate();
	};
	
	ObjectUtil.inherits(RoomTwo, BasicRoom);
	
	RoomTwo.prototype.initiate = function () {
	  var worldContext = this;
	  var path = this.PathUtil.inLevelOne;
	
	
	  // BOXES
	  this._staticObjects.push(new this.Box({
	    pos : { x : 0, y : 400 },
	    context : this.game.context,
	    width: 1340,
	    height: 20,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1320, y : 0 },
	    context : this.game.context,
	    width: 20,
	    height: 400,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  // far right platform
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1500, y : 250 },
	    context : this.game.context,
	    width: 500,
	    height: 20
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1340, y : 250 },
	    context : this.game.context,
	    width: 90,
	    height: 20
	  }));
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 100, y : this.height - 120 },
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
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 100, y : this.height - 120 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.camera.height = 500;
	        this.notActivated = false;
	      }
	    }
	  }));
	
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 1890, y : 150 },
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
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1890, y : 150 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.camera.height = 500;
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  // LADDERS
	
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 1430, y : 250 },
	    context : this.game.context,
	    width: 70,
	    height: 480,
	    ladderId: 1
	  }));
	
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 650, y : this.height - 120 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'lockedTwo',
	      coords: { },
	      locked: true
	    }
	  }));
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 1810, y : this.height - 120 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'lockedTwo',
	      coords: { },
	      locked: true
	    }
	  }));
	  // Events
	
	//   this._staticObjects.push(new this.Trigger({
	//     pos : { x : 1200, y : this.height - 300 },
	//     context : this.game.context,
	//     width: 50,
	//     height: 300,
	//     activate: function () {
	//       if (this.notActivated) {
	//         worldContext.game.camera.screenShake();
	//         worldContext.spawnCreepingShroom();
	//         this.notActivated = false;
	//       }
	//     }
	//   }));
	};
	
	// RoomTwo.prototype.spawnCreepingShroom = function () {
	//   var shroom = new this.CreepingShroom({
	//     pos : { x : 50, y : this.height - 180 },
	//     context : this.game.context,
	//     height: 130,
	//     width: 50,
	//     growsToward: 'right'
	//   });
	//
	//   this.game._movingObjects.push(shroom);
	//   this._movingObjects.push(shroom);
	// };
	
	
	module.exports = RoomTwo;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	// notable events:
	//  enemy midway through room, when player gets to a certain distance,
	//   he charges the player.
	//  ladder midway through room to get around enemy. When player lands on
	//   pile of tables, the tables crush the enemy
	//  door to room 4
	var BasicRoom = __webpack_require__(18);
	var ObjectUtil = __webpack_require__(4);
	var SpriteUtil = __webpack_require__(7);
	
	
	var RoomThree = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 550,
	    width: 3000,
	    playerJump: -10,
	    playerStartX: 50,
	    playerStartY: 470,
	    doorCoords: doorCoords,
	    img: 'lib/sprites/level1/room3/bg.png'
	  });
	
	  this.initiate();
	};
	
	ObjectUtil.inherits(RoomThree, BasicRoom);
	
	RoomThree.prototype.initiate = function () {
	  var worldContext = this;
	  var path = this.PathUtil.inLevelOne;
	
	  // BOXES
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1500, y : 150 },
	    context : this.game.context,
	    width: 320,
	    height: 20,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 0, y : this.height - 20 },
	    context : this.game.context,
	    width: 3000,
	    height: 20,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1800, y : 180 },
	    context : this.game.context,
	    width: 200,
	    height: 20,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 300, y : 150 },
	    context : this.game.context,
	    width: 500,
	    height: 20,
	    img: 'lib/sprites/nullpic.png'
	  }));
	
	  worldContext.game.topRenders.push(new this.Decorative({
	    pos : { x : 1435, y : 15 },
	    context : this.game.context,
	    width: 600,
	    height: 160,
	    img: 'lib/sprites/level1/room3/rafter2.png',
	    animated: false,
	    activated: false,
	    sprite: {
	      frameIdx: 0,
	      numFrames: 1,
	      height: 600,
	      width: 160
	    },
	    decorativeId: 2,
	    orientation: 'landscape'
	  }));
	
	  worldContext.game.topRenders.push(new this.Decorative({
	    pos : { x : 225, y : 15 },
	    context : this.game.context,
	    width: 600,
	    height: 160,
	    img: 'lib/sprites/level1/room3/rafter1.png',
	    animated: false,
	    activated: false,
	    sprite: {
	      frameIdx: 0,
	      numFrames: 1,
	      height: 600,
	      width: 160
	    },
	    decorativeId: 2,
	    orientation: 'landscape'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 900, y : 310 },
	    context : this.game.context,
	    img: 'lib/sprites/forkliftroom3.png',
	    width: 300,
	    height: 20,
	  }));
	
	
	  // Ladders
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 1430, y : 150 },
	    context : this.game.context,
	    width: 70,
	    height: 300,
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
	    pos : { x : 50, y : this.height - 130 },
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
	    pos : { x : 2850, y : this.height - 130 },
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
	
	  this._staticObjects.push(new this.Decorative({
	    pos : { x : 1830, y : 210 },
	    context : this.game.context,
	    width: 530,
	    height: 320,
	    img: 'lib/sprites/trashfallingroom3.png',
	    animated: true,
	    activated: false,
	    sprite: {
	      frameIdx: 0,
	      numFrames: 4,
	      height: 1325,
	      width: 530
	    },
	    decorativeId: 1,
	    orientation: 'landscape'
	  }));
	
	  // Triggers
	  // Activate enemy
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1000, y : this.height - 100 },
	    context : this.game.context,
	    width: 50,
	    height: 100,
	    activate: function () {
	      if (this.notActivated) {
	        var enemy = worldContext.modifyObject('movingObject', 'triggerId', 1);
	        enemy.obj.activated = true;
	        worldContext.game.cameraTarget = enemy.obj;
	        worldContext.game.camera.startHallwaySquash(500);
	        worldContext.game.camera.screenShake();
	
	        var ladder = worldContext.modifyObject('staticObject', 'ladderId', 2);
	        worldContext.game._staticObjects[ladder.index].height = 330;
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  // once player is up ladder, follow player again
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 230, y : 200 },
	    context : this.game.context,
	    width: 100,
	    height: 200,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.cameraTarget = worldContext.game.player;
	        worldContext.game.camera.endHallwaySquash();
	        worldContext.game.camera.startHallwayWiden(550);
	        this.notActivated = false;
	      }
	    }
	  }));
	
	
	// kill enemy
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
	          worldContext.game.cameraTarget = worldContext.game.player;
	        }, 200);
	
	        worldContext.game.camera.screenShake();
	        var deco = worldContext.modifyObject('staticObject', 'decorativeId', 1);
	        deco.obj.activated = true;
	
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  // Enemies
	  this._movingObjects.push(new this.ChasingEnemy({
	    pos : { x : 1500, y : 440 },
	    context : this.game.context,
	    game: this.game,
	    width: 100,
	    height: 100,
	    activated: false,
	    triggerId: 1,
	    imgOptions: SpriteUtil.levelOneRoomThreeEnemy.upright
	  }));
	};
	
	module.exports = RoomThree;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// notable events: locked door at end of room, when player tries door, enemy
	//  walks in, collapses, and after ten or so seconds, bursts, creating a
	//  shower of pollen, start transition, end level 1.
	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var ObjectUtil = __webpack_require__(4);
	var CutsceneUtil = __webpack_require__(24);
	
	var RoomFour = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 500,
	    width: 750,
	    playerJump: -10,
	    playerX: 620,
	    playerY: 420,
	    doorCoords: doorCoords,
	    img: ''
	  });
	
	  game.topRenders = [];
	  this.initiate();
	};
	
	ObjectUtil.inherits(RoomFour, BasicRoom);
	
	RoomFour.prototype.initiate = function () {
	  var worldContext = this;
	  var path = this.PathUtil.inLevelOne;
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 650, y : this.height - 50 },
	    context : this.game.context,
	    width: 100,
	    height: 100,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.CutsceneUtil.levelOneRoomFourScene({
	          callback1: function (height) {
	            worldContext.game.camera.followHigh();
	            worldContext.game.camera.startHallwaySquash(height);
	          },
	          callback2: function () {
	            worldContext.game.endLevel(worldContext.game.context);
	          },
	          worldContext: worldContext,
	          chasingEnemy: worldContext.ChasingEnemy
	        });
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  // DOORS
	  this._staticObjects.push(new this.Door({
	    pos : { x : 650, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'lockedTwo',
	      coords: { },
	      locked: true
	    }
	  }));
	
	  this._staticObjects.push(new this.Door({
	    pos : { x : 50, y : this.height - 110 },
	    context : this.game.context,
	    width: 70,
	    height: 100,
	    doorPath: {
	      door: 'lockedOne',
	      coords: { },
	      locked: true
	    }
	  }));
	
	  // RoomTwo.prototype.spawnCreepingShroom = function () {
	  //   var shroom = new this.CreepingShroom({
	  //     pos : { x : 50, y : this.height - 180 },
	  //     context : this.game.context,
	  //     height: 130,
	  //     width: 50,
	  //     growsToward: 'right'
	  //   });
	  //
	  //   this.game._movingObjects.push(shroom);
	  //   this._movingObjects.push(shroom);
	  // };
	};
	
	module.exports = RoomFour;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var ObjectUtil = __webpack_require__(4);
	var BasicGame = __webpack_require__(5);
	var RoomOne = __webpack_require__(29);
	
	var LevelTwo = function (context, endLevelCallback) {
	  BasicGame.call(
	    this,
	    context,
	    {
	      initialRoom: 'roomOne',
	      rooms: {
	        roomOne: RoomOne
	      }
	    },
	    endLevelCallback
	  );
	};
	
	ObjectUtil.inherits(LevelTwo, BasicGame);
	
	module.exports = LevelTwo;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// starting room in game
	// notable events: player cannot move until 'instructions' are over
	var BasicRoom = __webpack_require__(18);
	var ObjectUtil = __webpack_require__(4);
	
	var RoomOne = function (game, doorCoords) {
	  BasicRoom.call(this, {
	    game: game,
	    height: 1500,
	    width: 4750,
	    playerJump: -20,
	    playerX: 50,
	    playerY: 50,
	    doorCoords: doorCoords,
	    img: ''
	  });
	
	  this.initiate();
	  game.particlesOn = true;
	  game.startCountdown();
	};
	
	ObjectUtil.inherits(RoomOne, BasicRoom);
	
	RoomOne.prototype.initiate = function () {
	  var worldContext = this;
	
	  this._staticObjects.push(new this.Shroom({
	    pos : { x : 50, y : this.height - 150 },
	    img: 'lib/sprites/mushroom1.png',
	    context : this.game.context,
	    width: 200,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 0, y : 0 },
	    context : this.game.context,
	    width: 350,
	    height: 300,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.camera.followHigh();
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 400, y : 0 },
	    context : this.game.context,
	    width: 750,
	    height: 700,
	    activate: function () {
	      if (this.notActivated) {
	        worldContext.game.camera.followHigh();
	
	        this.notActivated = false;
	      }
	    }
	  }));
	
	
	
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 1200, y : this.height - 400 },
	    context : this.game.context,
	    width: 70,
	    height: 390,
	    ladderId: 1
	  }));
	
	
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1270, y : this.height - 400 },
	    context : this.game.context,
	    width: 430,
	    height: 20
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1700, y : this.height - 400 },
	    context : this.game.context,
	    width: 500,
	    height: 400
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 2200, y : this.height - 1400 },
	    context : this.game.context,
	    width: 500,
	    height: 1400
	  }));
	
	  this._staticObjects.push(new this.Shroom({
	    pos : { x : 2000, y : this.height - 540 },
	    img: 'lib/sprites/mushroom1.png',
	    context : this.game.context,
	    width: 200,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1310, y : this.height - 150 },
	    context : this.game.context,
	    width: 200,
	    height: 300,
	    activate: function () {
	      if (this.notActivated) {
	        if (worldContext.game.countdownActive) {
	          worldContext.game.stopCountdown();
	        }
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.Trigger({
	    pos : { x : 1290, y : this.height - 180 },
	    context : this.game.context,
	    width: 20,
	    height: 300,
	    activate: function () {
	      if (this.notActivated) {
	        if (!worldContext.game.countdownActive) {
	          worldContext.game.startCountdown();
	        }
	      }
	    }
	  }));
	
	  this._staticObjects.push(new this.StaticObject({
	    pos : { x : 1320, y : this.height - 180 },
	    context : this.game.context,
	    width: 390,
	    height: 215
	  }));
	
	  worldContext.game.topRenders.push(new this.Decorative({
	    pos : { x : 1310, y : this.height - 200 },
	    context : this.game.context,
	    width: 70,
	    height: 150,
	    img: 'lib/sprites/antifungalchamber.png'
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1320, y : this.height - 180 },
	    context : this.game.context,
	    width: 390,
	    height: 20,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1690, y : this.height - 180 },
	    context : this.game.context,
	    width: 20,
	    height: 215,
	  }));
	
	  this._staticObjects.push(new this.Box({
	    pos : { x : 1150, y : this.height - 820 },
	    context : this.game.context,
	    width: 400,
	    height: 20
	  }));
	
	  this._staticObjects.push(new this.Ladder({
	    pos : { x : 1150, y : 0 },
	    context : this.game.context,
	    width: 70,
	    height: 650,
	    ladderId: 2
	  }));
	
	  // var path = this.PathUtil.inLevelTwo;
	
	  // DOORS
	  // this._staticObjects.push(new this.Door({
	  //   pos : { x : 50, y : this.height - 110 },
	  //   context : this.game.context,
	  //   width: 70,
	  //   height: 100,
	  //   doorPath: {
	  //     door: 'roomTwo',
	  //     coords: {
	  //       x: path.fromRoomOne.toRoomTwo.x,
	  //       y: path.fromRoomOne.toRoomTwo.y
	  //     }
	  //   }
	  // }));
	};
	
	module.exports = RoomOne;


/***/ },
/* 30 */
/***/ function(module, exports) {

	var GameView = function (game, isOver) {
	  this.game = game;
	  this.inputs = {};
	  if (isOver) {
	    this.isOver = isOver;
	  } else {
	    this.isOver = false;
	  }
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
	  if (!this.isOver) {
	    this.keyCheck();
	    this.game.step();
	    this.animFrame = requestAnimationFrame(this.animate.bind(this));
	  }
	};
	
	GameView.prototype.keyCheck = function () {
	  // check inputs
	  // jump - w
	
	  if (!this.game.player.inputDisabled) {
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
	
	    if (this.inputs[69]) {
	      this.game.player.processInteraction(this.game);
	      this.inputs[69] = false;
	    }
	  }
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map