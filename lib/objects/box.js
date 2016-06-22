var ObjectUtil = require('../util/objectUtil.js');
var StaticObject = require('./staticObject');

var Box = function (options) {
  this.boxId = options.boxId;
  StaticObject.call(this, options);
};

ObjectUtil.inherits(Box, StaticObject);

module.exports = Box;
