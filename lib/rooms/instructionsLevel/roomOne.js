var BasicRoom = require('../basicRoom');
var ObjectUtil = require('../../util/objectUtil.js');

var RoomOne = function (game, doorCoords) {
  BasicRoom.call(this, {
    game: game,
    height: 500,
    width: 1000,
    playerJump: -10,
    playerX: 30,
    playerY: 420,
    doorCoords: doorCoords,
    img: ''
  });

  this.initiate();
};

ObjectUtil.inherits(RoomOne, BasicRoom);

RoomOne.prototype.initiate = function () {
  var worldContext = this;
  var path = this.PathUtil.inInstructionsLevel;

  this._staticObjects.push(new this.Door({
    pos : { x : 900, y : this.height - 350 },
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

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 50, y : this.height - 200 },
    context : this.game.context,
    message: 'A to move left, D to move right',
    fontSize: 18
  }));

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 70, y : this.height - 150 },
    context : this.game.context,
    message: 'W to jump on over this uh... dais',
    fontSize: 14
  }));

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 80, y : this.height - 125 },
    context : this.game.context,
    message: 'or plinth, if you like to think yourself as a statue',
    fontSize: 10
  }));

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 145, y : this.height - 100 },
    context : this.game.context,
    message: '...perhaps a mesa',
    fontSize: 8
  }));

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 70, y : this.height - 150 },
    context : this.game.context,
    message: 'W to jump on over this uh... dais',
    fontSize: 14
  }));

  this._staticObjects.push(new this.TextOverlay({
    pos : { x : 780, y : this.height - 150 },
    context : this.game.context,
    message: 'E to open doors',
    fontSize: 18,
    overlayId: 1
  }));

  this._staticObjects.push(new this.Door({
    pos : { x : 900, y : this.height - 110 },
    context : this.game.context,
    width: 70,
    height: 100,
    doorPath: {
      door: 'lockedTwo',
      coords: { },
      locked: true
    }
  }));



  this._staticObjects.push(new this.Trigger({
    pos : { x : 900, y : this.height - 100 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        var doorText = worldContext.modifyObject('staticObject', 'overlayId', 1);
        doorText.obj.message = "oh, it's locked";

        worldContext._staticObjects.push(new worldContext.TextOverlay({
          pos : { x : 480, y : worldContext.height - 280 },
          context : worldContext.game.context,
          message: 'Try getting on this ladder and pressing W',
          fontSize: 16,
          overlayId: 2
        }));
      }

      this.notActivated = false;

    }
  }));


  this._staticObjects.push(new this.Trigger({
    pos : { x : 630, y : this.height - 300 },
    context : this.game.context,
    width: 70,
    height: 100,
    activate: function () {
      if (this.notActivated) {
        var doorText = worldContext.modifyObject('staticObject', 'overlayId', 2);
        if (doorText) {
          worldContext.game._staticObjects.splice(doorText.index, 1);
        }

        worldContext._staticObjects.push(new worldContext.TextOverlay({
          pos : { x : 480, y : worldContext.height - 180 },
          context : worldContext.game.context,
          message: 'nice',
          fontSize: 16,
          overlayId: 3
        }));

        worldContext._staticObjects.push(new worldContext.TextOverlay({
          pos : { x : 600, y : worldContext.height - 350 },
          context : worldContext.game.context,
          message: 'going through here starts the game',
          fontSize: 16,
          overlayId: 4
        }));

        this.notActivated = false;
      }
    }
  }));




  this._staticObjects.push(new this.Box({
    pos : { x : 200, y : this.height - 50 },
    context : this.game.context,
    width: 200,
    height: 50
  }));

  this._staticObjects.push(new this.Box({
    pos : { x : 700, y : this.height - 250 },
    context : this.game.context,
    width: 300,
    height: 20
  }));

  this._staticObjects.push(new this.Ladder({
    pos : { x : 630, y : this.height - 250 },
    context : this.game.context,
    width: 70,
    height: 200,
    ladderId: 1
  }));

};

module.exports = RoomOne;
