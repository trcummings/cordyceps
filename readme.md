# Cordyceps

![Cordyceps][preview]
[preview]: https://github.com/trcummings/cordyceps/blob/master/assets/images/cordyceps-preview.png "Preview"

Cordyceps is a psychedelic platform jumper web game where you, the player, a humble janitor for a fungal research center, wake up to find yourself in the midst of an outbreak that has harrowing consequences for all infected!

Run, jump, and avoid your fallen coworkers as you try and escape the facility. Sometimes, however, infection is inevitable. Get to the nearest fumigation chamber to survive before you lose all grip on material reality!

[Live Here!](http:www.thomsencummings.com/cordyceps "Portfolio Page Game")

## Screenshots

![SS1][ss1]
![SS2][ss2]
![SS3][ss3]

[ss1]: https://github.com/trcummings/cordyceps/blob/master/assets/images/ss1.png "SS1"
[ss2]: https://github.com/trcummings/cordyceps/blob/master/assets/images/ss2.png "SS2"
[ss3]: https://github.com/trcummings/cordyceps/blob/master/assets/images/ss3.png "SS3"

## Features

Cordyceps includes:

* A dynamic floating camera which follows the player, changing position, size, and distance, based on the in-game narrative demands
* Responsive jumping and running controls
* Seamless Collision detection
* Event triggers and goal states
* Responsive environmental features
* Basic enemy AI
* A colorful and terrifying world

## Future Directions


### NPM package for physics engine

Currently, the dev team (okay, okay, it's just me) is hard at work putting together the current physics engine, object management, sprite rendering, and dynamic camera system into a NPM package called GlassPocket.


### More rooms and levels!

Currently, Cordyceps is a stylization heavy game. On the plus side, the code is very modular and scalable, making adding new room, object, and enemy assets very simple. For example:

```JavaScript
worldContext.game.topRenders.push(new this.Decorative({
  pos : { x : 225, y : 15 },
  context : this.game.context,
  width: 600,
  height: 160,
  img: 'lib/sprites/level1/room3/rafter1.png',
  animated: false,
  activated: false,
  sprite: {
    frameIdx: 0,
    numFrames: 1,
    height: 600,
    width: 160
  },
  decorativeId: 2,
  orientation: 'landscape'
}));

this._staticObjects.push(new this.Box({
  pos : { x : 900, y : 310 },
  context : this.game.context,
  img: 'lib/sprites/forkliftroom3.png',
  width: 300,
  height: 20,
}));


// Ladders
this._staticObjects.push(new this.Ladder({
  pos : { x : 1430, y : 150 },
  context : this.game.context,
  width: 70,
  height: 300,
  ladderId: 1
}));
```


However, the art team (okay, okay, you got me, it's just me again) has a real N+1 icebox, because all assets are drawn by mouse, one frame at a time.
