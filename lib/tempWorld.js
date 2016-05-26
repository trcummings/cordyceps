var TempWorld = function () {
  this.height = 2000;
  this.width = 2000;
  this.boxes = [];

  this.initiateBoxes();
};

TempWorld.prototype.initiateBoxes = function () {
  // left box
  this.boxes.push({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: 40,
    height: this.height
  });

  // right box
  this.boxes.push({
    cpos : { x : this.width - 10, y : 0 },
    ppos : { x : this.width - 10, y : 0 },
    acel : { x: 0, y : 0 },
    width: 50,
    height: 6 * this.height
  });

  // top box
  this.boxes.push({
    cpos : { x : 0, y : 0 },
    ppos : { x : 0, y : 0 },
    acel : { x: 0, y : 0 },
    width: this.width,
    height: 40,
  });

  // bottom box
  this.boxes.push({
    cpos : { x : 0, y : this.height - 10 },
    ppos : { x : 0, y : this.height - 10 },
    acel : { x: 0, y : 0 },
    width: this.width,
    height: 40,
  });

  this.boxes.push({
    cpos : { x : 220, y : 50 },
    ppos : { x : 220, y : 50 },
    acel : { x: 0, y : 0 },
    width: 80,
    height: 80
  });
};

module.exports = TempWorld;
