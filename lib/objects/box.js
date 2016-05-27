var Box = function (options) {
    this.cpos = { x: options.cpos.x, y: options.cpos.y }; //needs x and y
    this.ppos = { x: options.ppos.x, y: options.ppos.y};
    this.acel = { x: options.acel.x, y: options.acel.y};
    this.width = options.width;
    this.height = options.height;
};

module.exports = Box;
