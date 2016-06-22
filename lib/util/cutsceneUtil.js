var SpriteUtil = require('./spriteUtil');
var TextOverlay = require('../objects/textOverlay');

var CutsceneUtil = {
  levelOneRoomOneScene: function (game) {
    var layingInterval;

    game.player.inputDisabled = true;
    game.player.facing = 'l';
    game.camera.height = 200;
    game.player.hidden = true;
    game.clearBlack();

    var sprite = SpriteUtil.player.standUpSprite();

    setTimeout(function () {
      game.clearBlack();

      game.camera.endHallwaySquash();
      game.camera.startHallwayWiden(350);

      layingInterval = setInterval(function () {
        game.specialRenders.push(function () {
          game.context.drawImage(
            sprite.image, 0, 200, 100, 100,
            game.player.pos.x - game.player.width - 5,
            game.player.pos.y - sprite.height - game.player.height + 35,
            100, 100
          );
        });
      }, 80);

      var i = 0;
      var standingInterval;

      setTimeout(function () {
        clearInterval(layingInterval);

        standingInterval = setInterval(function () {
          game.specialRenders = [];

          game.specialRenders.push(function () {
            game.context.drawImage(
              sprite.image, 100 * i, 200, 100, 100,
              game.player.pos.x - game.player.width - 5,
              game.player.pos.y - sprite.height - game.player.height + 35,
              100, 100
            );
          });

          i++;
        }, 100);
      }, 5000);

      setTimeout(function () {
        game.specialRenders = [];
        clearInterval(standingInterval);
        clearInterval(layingInterval);
        game.camera.endHallwayWiden();
        game.camera.startHallwayWiden(500);
        game.player.inputDisabled = false;
        game.player.hidden = false;
      }, 5900);

    }, 500);
  },

  levelOneRoomFourScene: function (callback1, callback2, worldContext) {
    // squash the scene for DRAMA
    callback1(400);

    // do the stuff
    // setInterval(function () {
    //   console.log('ya fucked son');
    // }, 100);

    // wait the appropriate amount of time
    setTimeout(function () {
      var bottomBox = worldContext.modifyObject('staticObject', 'boxId', 'bottom');
      worldContext.game._staticObjects.splice(bottomBox.index, 1);

      // close it out after a little
      setTimeout(function () {
        callback1(0);
        setTimeout(function () {
          callback2();
        }, 3000);
        // game.clearBlack();
      }, 300);
    }, 8000);
  }
};

module.exports = CutsceneUtil;
