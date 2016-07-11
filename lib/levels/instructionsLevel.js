var ObjectUtil = require('../util/objectUtil.js');
var BasicGame = require('./basicGame');
var RoomOne = require('../rooms/instructionsLevel/roomOne');
var RoomTwo = require('../rooms/instructionsLevel/roomTwo');

var InstructionsLevel = function (context, endLevel, endGame) {
  BasicGame.call(
    this,
    context,
    {
      initialRoom: 'roomOne',
      rooms: {
        roomOne: RoomOne,
        roomTwo: RoomTwo
      }
    },
    endLevel,
    endGame
  );
};

ObjectUtil.inherits(InstructionsLevel, BasicGame);

module.exports = InstructionsLevel;
