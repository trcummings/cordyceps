var SpriteUtil = {
  player: {
    r: {
      jumping: { url: '', numFrames: 1},
      falling: { url: '', numFrames: 1},
      running: {
        url: 'lib/sprites/player/playerspriterightrunning1.png',
        numFrames: 8,
        width: 800,
        height: 100
      },
      standing: {
        url: 'lib/sprites/player/playerstandingright1.png',
        numFrames: 1,
        width: 100,
        height: 100
      }
    },
    l: {
      jumping: { url: '', numFrames: 1},
      falling: { url: '', numFrames: 1},
      running: {
        url: 'lib/sprites/player/playerspriteleftrunning1.png',
        numFrames: 8,
        width: 800,
        height: 100
      },
      standing: {
        url: 'lib/sprites/player/playerstandingleft1.png',
        numFrames: 1,
        width: 100,
        height: 100
      }
    },
    ladder: {
      up: { url: '', numFrames: 1},
      down: { url: '', numFrames: 1},
    },
    height: 100,
    width: 100,
    orientation: 'landscape',
    spriteChoice: function (playerContext) {
      // note: turn playerContext into an options hash instead
      var player = SpriteUtil.player;

      var height;
      var width;
      var url;
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
          url = r.standing.url; // CHANGE ASAP
          numFrames = r.standing.numFrames; // CHANGE ASAP
          height = r.standing.height;
          width = r.standing.width;

        } else if (playerContext.velocity.x > 1) {
          url = r.running.url;
          numFrames = r.running.numFrames;
          height = r.running.height;
          width = r.running.width;

        } else {
          url = r.standing.url;
          numFrames = r.standing.numFrames;
          height = r.standing.height;
          width = r.standing.width;
        }
      } else if (playerContext.facing === 'l') {
        var l = player.l;

        if (playerContext.jumping) {
          url = l.standing.url; // CHANGE ASAP
          numFrames = l.standing.numFrames; // CHANGE ASAP
          height = l.standing.height;
          width = l.standing.width;

        } else if (playerContext.velocity.x < -1) {
          url = l.running.url;
          numFrames = l.running.numFrames;
          height = l.running.height;
          width = l.running.width;

        } else {
          url = l.standing.url;
          numFrames = l.standing.numFrames;
          height = l.standing.height;
          width = l.standing.width;
        }
      }

      return {
        url: url,
        numFrames: numFrames,
        height: height,
        width: width
      };
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
      sX = sprite.frameIdx * sWidth / numFrames;
      sY = 0;
      sWidth = sWidth / numFrames;
      dHeight = sHeight;
      dWidth = sWidth;
    }

    options.context.drawImage(
      image, sX, sY, sWidth, sHeight,
      options.xPos, options.yPos,
      dWidth, dHeight
    );
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
