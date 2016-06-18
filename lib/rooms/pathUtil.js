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
      toRoomTwo: { x: 4920, y: 220 },
      toRoomFour: { x: 70, y: 470 }
    }
  },
  inLevelTwo: {},
  inLevelThree: {}
};

module.exports = PathUtil;
