var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Box = function (options) {
  StaticObject.call(this, options);
};

Util.inherits(Box, StaticObject);

module.exports = Box;
