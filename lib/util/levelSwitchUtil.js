var LevelOne = require('../levels/levelOne');
var LevelTwo = require('../levels/levelTwo');
var GameView = require("../gameView");

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
        console.log('ayy');
      },
      LevelSwitchUtil.endGame
    );
    LevelSwitchUtil.gameView = new GameView(levelTwo);
    LevelSwitchUtil.gameView.start();
  },

  endGame: function (level, context) {
    console.log('died 2 death');
    LevelSwitchUtil.gameView.isOver = true;
    cancelAnimationFrame(LevelSwitchUtil.gameView.animFrame);
    LevelSwitchUtil.menu.drawEnd(context);
  }
};

module.exports = LevelSwitchUtil;
