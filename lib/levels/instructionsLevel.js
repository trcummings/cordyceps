var ObjectUtil = require('../util/objectUtil.js');
var BasicGame = require('./basicGame');
var RoomOne = require('../rooms/instructionsLevel/roomOne');
var RoomTwo = require('../rooms/instructionsLevel/roomTwo');

var LevelTwo = function (context, endLevelCallback) {
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
    endLevelCallback
  );
};

ObjectUtil.inherits(LevelTwo, BasicGame);

module.exports = LevelTwo;
