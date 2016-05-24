var Camera = {
  cpos: { x: 0, y: 0 },
  ppos: { x: 0, y: 0 },
  acel: { x: 0, y: 0 },
  height: document.body.clientHeight,
  width : document.body.clientWidth,
  maxHeight: 6 * document.body.clientHeight,
  maxWidth : 6 * document.body.clientWidth,
  cullDist: 300,
  bound: true,
  target: { x: 0, y: 0 },
  strength: 0,
  damper: 0
};

module.exports = Camera;
