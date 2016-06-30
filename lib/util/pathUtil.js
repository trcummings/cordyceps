var PathUtil = {
  inLevelOne: {
    fromRoomOne: {
      toRoomTwo: { x: 120, y: 670 }
    },
    fromRoomTwo: {
      toRoomOne: { x: 70, y: 420 },
      toRoomThree: { x: 70, y: 470 }
    },
    fromRoomThree: {
      toRoomTwo: { x: 1890, y: 220 },
      toRoomFour: { x: 70, y: 420 }
    }
  },
  inLevelTwo: {},
  inLevelThree: {}
};

module.exports = PathUtil;
