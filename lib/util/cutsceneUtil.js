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

  levelOneRoomFourScene: function (options) { //callback1, callback2, worldContext) {
    var room = options.worldContext;
    // squash the scene for DRAMA
    options.callback1(400);

    var mook = new options.chasingEnemy({
      pos : { x : 50, y : 400 },
      game: room.game,
      context : room.game.context,
      width: 100,
      height: 100,
      activated: true,
      triggerId: 2,
      imgOptions: SpriteUtil.levelOneRoomThreeEnemy.upright
    });

    room.game._movingObjects.push(mook);
    room._movingObjects.push(mook);
    mook.speed = 0.5;

    setTimeout(function () {
      mook.speed = 0;
      mook.activated = false;
      room.game.particlesOn = true;
    }, 6000);


    // wait the appropriate amount of time
    var timeOutOne = setTimeout(function () {
      var bottomBox = room.modifyObject('staticObject', 'boxId', 'bottom');
      room.game._staticObjects[bottomBox.index].width = 450;
      // room.game._staticObjects.splice(bottomBox.index, 1);

      // close it out after a little
      var timeOutTwo = setTimeout(function () {
        options.callback1(0);
        setTimeout(function () {
          options.callback2();
        }, 3000);
        // game.clearBlack();
      }, 300);

      room.game.cutsceneTimers.push(timeOutTwo);
    }, 8000);

    room.game.cutsceneTimers.push(timeOutOne);
  }
};

module.exports = CutsceneUtil;
