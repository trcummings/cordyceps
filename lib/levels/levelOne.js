var Util = require('../util.js');
var BasicGame = require('./basicGame');
var RoomOne = require('../rooms/levelOne/roomOne');
var RoomTwo = require('../rooms/levelOne/roomTwo');
var RoomThree = require('../rooms/levelOne/roomThree');
var RoomFour = require('../rooms/levelOne/roomFour');

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

Util.inherits(LevelOne, BasicGame);

module.exports = LevelOne;
