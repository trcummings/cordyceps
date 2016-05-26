var BasicObject = function (context) {
  this.cpos = { x: 0, y: 0 }; // camera position vector center
  this.ppos = { x: 0, y: 0 }; // player position center
  this.acel = { x: 0, y: 0 };
  this.context = context;

  // this.AABB = {
  //   tl: [this.cpos.x - 10, this.cpos.y - 10],
  //   tr: [this.cpos.x + 10, this.cpos.y - 10],
  //   bl: [this.cpos.x - 10, this.cpos.y + 10],
  //   br: [this.cpos.x + 10, this.cpos.y + 10]
  // };

  this.grounded = false;
  this.jumping = false;
};
