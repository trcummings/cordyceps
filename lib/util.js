var Util = {
  inherits: function (ChildClass, ParentClass) {
    var Surrogate = function () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  },

  dist: function (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  scale: function (vector, magnitude) {
    return [vector[0] * magnitude, vector[1] * magnitude];
  },

  verletTransform: function (obj) {
    obj.cpos.x += obj.acel.x * 0.256;
    obj.cpos.y += obj.acel.y * 0.256;

    var dx = 2 * obj.cpos.x - obj.ppos.x;
    var dy = 2 * obj.cpos.y - obj.ppos.y;

    obj.ppos.x = obj.cpos.x;
    obj.ppos.y = obj.cpos.y;

    obj.cpos.x = dx;
    obj.cpos.y = dy;

    obj.acel.x = 0;
    obj.acel.y = 0;
  }
  //
  // vectorAngle: function(vector, objectPos) {
  //   var hypotenuse = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  // }
};


module.exports = Util;
