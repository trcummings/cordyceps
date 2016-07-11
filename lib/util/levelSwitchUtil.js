var LevelOne = require('../levels/levelOne');
var LevelTwo = require('../levels/levelTwo');
var InstructionsLevel = require('../levels/instructionsLevel');
var GameView = require("../gameView");

var LevelSwitchUtil = {
  startGame: function (context, menu) {
    LevelSwitchUtil.menu = menu || LevelSwitchUtil.menu;

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
  },

  instructionsLevel: function (context, menu) {
    // dont do shit
    LevelSwitchUtil.menu = menu;
    var instructionsLevel = new InstructionsLevel(
      context,
      function (context) {
        setTimeout(function () {
          cancelAnimationFrame(LevelSwitchUtil.gameView.animFrame)
          LevelSwitchUtil.startGame(context, LevelSwitchUtil.menu);
        }, 200)
      },
      LevelSwitchUtil.endGame
    );
    LevelSwitchUtil.gameView = new GameView(instructionsLevel);
    LevelSwitchUtil.gameView.start();
  }
};

module.exports = LevelSwitchUtil;
