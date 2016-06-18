var PathUtil = {
  inLevelOne: {
    fromRoomOne: {
      toRoomTwo: { x: 3200, y: 720 }
    },
    fromRoomTwo: {
      toRoomOne: { x: 50, y: 470 },
      toRoomThree: { x: 50, y: 520 }
    },
    fromRoomThree: {
      toRoomTwo: { x: 2920, y: 220 },
      toRoomFour: { x: 30, y: 30 }
    }
  },
  inLevelTwo: {},
  inLevelThree: {}
};

module.exports = PathUtil;
