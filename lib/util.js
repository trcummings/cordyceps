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
  // 
  // vectorAngle: function(vector, objectPos) {
  //   var hypotenuse = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
  // }
};


module.exports = Util;
