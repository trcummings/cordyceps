var Util = require('../util.js');
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

Util.inherits(LevelTwo, BasicGame);

module.exports = LevelTwo;
