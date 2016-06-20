var CutsceneUtil = {
  levelOneRoomOneScene: function (game) {
    game.player.inputDisabled = true;
    game.player.facing = 'l';
    game.camera.height = 200;
    game.clearBlack();

    setTimeout(function () {
      game.camera.endHallwaySquash();
      game.camera.startHallwayWiden(350);

      setTimeout(function () {
        game.camera.endHallwayWiden();
        game.camera.startHallwayWiden(500);
        game.player.inputDisabled = false;
      }, 5000);
    }, 500);
  },

  levelOneRoomFourScene: function (callback1, callback2) {
    // squash the scene for DRAMA
    callback1(400);

    // do the stuff
    // setInterval(function () {
    //   console.log('ya fucked son');
    // }, 100);

    // wait the appropriate amount of time
    setTimeout(function () {
      callback1(0);

      // close it out after a little
      setTimeout(function () {
        callback2();
        game.clearBlack();
      }, 300);
    }, 10000);
  }
};

module.exports = CutsceneUtil;
