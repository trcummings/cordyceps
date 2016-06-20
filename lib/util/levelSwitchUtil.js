var LevelOne = require('../levels/levelOne');
var LevelTwo = require('../levels/levelTwo');
var GameView = require("../gameView");

var LevelSwitchUtil = {
  gameStartCallback: function (context) {
    var levelOne = new LevelOne(
      context,
      LevelSwitchUtil.goToLevelTwo
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

};

module.exports = LevelSwitchUtil;
