var LevelOne = require('./levels/levelOne');
var GameView = require("./gameView");

var LevelSwitchUtil = {
  gameStartCallback: function (context) {
    var levelOne = new LevelOne(
      context,
      LevelSwitchUtil.goToLevelTwo
    );
    new GameView(levelOne).start();
  },

  goToLevelTwo: function (context) {
    // var levelTwo = new LevelOne(context, startLevelTwo);
    // new GameView(levelTwo).start();
    alert('render level two');
  },

};

module.exports = LevelSwitchUtil;
