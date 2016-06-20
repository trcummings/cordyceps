var CutsceneUtil = {
  levelOneRoomFourScene: function (callback) {
    alert('o shit he walkin in');

    setTimeout(function () {
      callback();
    }, 3000);
  }
};

module.exports = CutsceneUtil;
