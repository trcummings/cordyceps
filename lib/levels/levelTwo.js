var ObjectUtil = require('../util/objectUtil.js');
var BasicGame = require('./basicGame');
var RoomOne = require('../rooms/levelTwo/roomOne');

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
