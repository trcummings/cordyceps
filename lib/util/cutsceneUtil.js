var CutsceneUtil = {
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
      }, 300);
    }, 10000);
  }
};

module.exports = CutsceneUtil;
