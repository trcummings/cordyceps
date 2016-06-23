var LevelOne = require('../levels/levelOne');
var LevelTwo = require('../levels/levelTwo');
var GameView = require("../gameView");

var LevelSwitchUtil = {
  startGame: function (context, menu) {
    LevelSwitchUtil.menu = menu;
    var levelOne = new LevelTwo(
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
