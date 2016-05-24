var Camera = function (height, width) {
  this.cpos = { x: 0, y: 0 }; // top left corner of camera object
  this.ppos = { x: 0, y: 0 }; // location of player object
  this.acel = { x: 0, y: 0 }; // acceleration of camera object
  this.height = height;
  this.width  = width;
  this.maxHeight = 6 * height;
  this.maxWidth = 6 * width;
  this.cullDistX = [0, width];  // "cull" distance. or, objects this far away from cam not rendered
  this.cullDistY = [0, height];
  this.bound = true;
  this.target = { x: 0, y: 0 };
  this.strength = 0;
  this.damper = 0;
};

Camera.prototype.squashCamera = function() {

};

function moveCamera(playerCPosX, playerCPosY) {
  // get the target point
  camera.target.x = player.cpos.x - (camera.width / 2);
  camera.target.y = player.cpos.y - (camera.height / 2);

  // move camera towards target point
  camera.acel.x += (1 / 8) * (camera.target.x - camera.cpos.x);
  camera.acel.y += (1 / 8) * (camera.target.y - camera.cpos.y);

  // camera shake update
  if (camera.strength > 0) {
    var randx = Math.random() * 2 * camera.strength - camera.strength;
    var randy = Math.random() * 2 * camera.strength - camera.strength;
    camera.acel.x += randx;
    camera.acel.y += randy;
    camera.strength -= camera.damper;
  }

  // camera drag
  camera.ppos.x = camera.cpos.x + (camera.ppos.x - camera.cpos.x) * 0.3;
  camera.ppos.y = camera.cpos.y + (camera.ppos.y - camera.cpos.y) * 0.3;

  // camera verlet
  camera.cpos.x += camera.acel.x * 0.256;
  camera.cpos.y += camera.acel.y * 0.256;
  var cx = 2 * camera.cpos.x - camera.ppos.x;
  var cy = 2 * camera.cpos.y - camera.ppos.y;
  camera.ppos.x = camera.cpos.x;
  camera.ppos.y = camera.cpos.y;
  camera.cpos.x = cx;
  camera.cpos.y = cy;
  camera.acel.x = 0;
  camera.acel.y = 0;

  // bind camera to world edges
  if (camera.bound) {

    // flush camera -- x bounds
    camera.cpos.x = Math.min(camera.cpos.x, camera.maxWidth - camera.width);
    camera.cpos.x = Math.max(camera.cpos.x, 0);

    // flush camera -- y bounds
    camera.cpos.y = Math.min(camera.cpos.y, camera.maxHeight - camera.height);
    camera.cpos.y = Math.max(camera.cpos.y, 0);
  }
}

module.exports = Camera;
