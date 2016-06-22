var SpriteUtil = {
  player: {
    r: {
      jumping: { url: '', numFrames: 1},
      falling: { url: '', numFrames: 1},
      running: {
        numFrames: 8,
        sY: 100,
        width: 800
      },
      standing: {
        numFrames: 1,
        sY: 400,
        width: 100
      }
    },
    l: {
      jumping: { url: '', numFrames: 1},
      falling: { url: '', numFrames: 1},
      running: {
        numFrames: 8,
        sY: 0,
        width: 800
      },
      standing: {
        numFrames: 1,
        sY: 300,
        width: 100
      }
    },
    ladder: {
      up: { url: '', numFrames: 1},
      down: { url: '', numFrames: 1},
    },
    height: 500,
    width: 900,
    orientation: 'landscape',

    spriteChoice: function (playerContext) {
      // note: turn playerContext into an options hash instead
      var player = SpriteUtil.player;
      var width;
      var numFrames;

      // if (!playerContext.notOnLadder) {
      //   url = player.r.standing.url; // CHANGE ASAP
      //   numFrames = player.r.standing.numFrames; // CHANGE ASAP
      //   height = player.r.standing.height;
      //   width = player.r.standing.width;
      // if player velocity 0, if player going up, if player going down

      if (playerContext.facing === 'r') {
        var r = player.r;

        if (playerContext.jumping) {
          numFrames = r.standing.numFrames; // CHANGE ASAP
          sY = r.standing.sY;
          width = r.standing.width;

        } else if (playerContext.velocity.x > 1) {
          numFrames = r.running.numFrames;
          sY = r.running.sY;
          width = r.running.width;

        } else {
          numFrames = r.standing.numFrames;
          sY = r.standing.sY;
          width = r.standing.width;
        }
      } else if (playerContext.facing === 'l') {
        var l = player.l;

        if (playerContext.jumping) {
          numFrames = l.standing.numFrames; // CHANGE ASAP
          sY = l.standing.sY;
          width = l.standing.width;

        } else if (playerContext.velocity.x < -1) {
          numFrames = l.running.numFrames;
          sY = l.running.sY;
          width = l.running.width;

        } else {
          numFrames = l.standing.numFrames;
          sY = l.standing.sY;
          width = l.standing.width;
        }
      }

      return {
        url: 'lib/sprites/player/player1sheet.png',
        numFrames: numFrames,
        sY: sY,
        height: 100,
        width: width
      };
    },

    standUpSprite: function () {
      var image = new Image();
      var sprite = {
        image: image,
        numFrames: 9,
        height: 100,
        width: 900
      };

      sprite.image.src = 'lib/sprites/player/player1sheet.png';

      return sprite;
    }
  },



  render: function (options) {
    var image, sX, sY, sWidth, sHeight,
    dWidth, dHeight, numFrames, sprite;

    sprite = options.sprite;
    image = sprite.image;
    sHeight = sprite.height;
    sWidth = sprite.width;
    numFrames = sprite.numFrames;

    if (options.orientation == 'portrait') {
      sX = 0;
      sY = sprite.frameIdx * sHeight / numFrames;
      sHeight = sHeight / numFrames;
      dWidth = sWidth;
      dHeight = sHeight;

    } else if (options.orientation == 'landscape') {
      if (sprite.sY) {
        sY = sprite.sY;
      } else {
        sY = 0;
      }

      sX = sprite.frameIdx * sWidth / numFrames;
      sWidth = sWidth / numFrames;
      dHeight = sHeight;
      dWidth = sWidth;
    }

    options.context.drawImage(
      image, sX, sY, sWidth, sHeight,
      options.xPos, options.yPos,
      dWidth, dHeight
    );
  },

  updateFrame: function (that) {
    if(!that.interval) {
      that.interval = window.setInterval(function () {
        that.sprite.frameIdx++;
        that.sprite.frameIdx = that.sprite.frameIdx % that.sprite.numFrames;
        // if (that.sprite.frameIdx >= that.sprite.numFrames - 1) {
        //   that.sprite.frameIdx = 0;
        // }
      }.bind(that), 80);
    }
  }
};




// function (player) {
//
// };
//
// if (this.facing == "r") {
//   this.sprite.img.src = 'lib/sprites/playerspriterightrunning1.png';
// } else {
//   this.sprite.img.src = 'lib/sprites/playerspriteleftrunning1.png';
// }
//
// if(!this.interval) {
//   this.interval = window.setInterval(function () {
//     if (!this.jumping && (this.velocity.x > 2 || this.velocity.x < -2)) {
//       if (this.sprite.frameIdx === this.sprite.numFrames - 1) {
//         this.sprite.frameIdx = 0;
//       }
//       this.sprite.frameIdx++;
//     } else {
//       this.sprite.frameIdx = 7;
//     }
//   }.bind(this), 80);
// }



module.exports = SpriteUtil;
