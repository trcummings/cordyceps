var Util = require('../util.js');
var StaticObject = require('./staticObject');

var Trigger = function (options) {
    this.activate = options.activate;
    this.notActivated = true;
    StaticObject.call(this, options);
};

Util.inherits(Trigger, StaticObject);

  // Trigger.prototype.render = function () {
  //   // dont do shit
  // };

module.exports = Trigger;
