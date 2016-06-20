var LevelOne = require('../levels/levelOne');
var LevelTwo = require('../levels/levelTwo');
var GameView = require("../gameView");

var LevelSwitchUtil = {
  startGame: function (context) {
    var levelOne = new LevelOne(
      context,
      LevelSwitchUtil.goToLevelTwo,
      LevelSwitchUtil.endGame
    );
    new GameView(levelOne).start();
  },

  goToLevelTwo: function (context) {
    var levelTwo = new LevelTwo(
      context,
      function () {
        console.log('ayy');
      }
    );
    new GameView(levelTwo).start();
  },

  endGame: function (context) {
    console.log('died 2 death');
  }
};

module.exports = LevelSwitchUtil;
