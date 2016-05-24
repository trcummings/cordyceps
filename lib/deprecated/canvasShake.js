var CanvasShake = function (context) {
  this.context = context;

  var shakeDuration = 800;
  var shakeStartTime = -1;

  function preShake() {
    if (shakeStartTime ==-1) return;
    var dt = Date.now()-shakeStartTime;
    if (dt>shakeDuration) {
        shakeStartTime = -1;
        return;
    }
    var easingCoef = dt / shakeDuration;
    var easing = Math.pow(easingCoef-1,3) +1;
    this.context.save();
    var dx = easing*(Math.cos(dt*0.1 ) + Math.cos( dt *0.3115))*15;
    var dy = easing*(Math.sin(dt*0.05) + Math.sin(dt*0.057113))*15;
    this.context.translate(dx, dy);
  }

  function postShake() {
    if (shakeStartTime ==-1) return;
    this.context.restore();
  }

  function startShake() {
     shakeStartTime=Date.now();
  }

  function drawThings() {
    this.context.fillStyle = '#F00';
    this.context.fillRect(10, 10, 50, 30);
    this.context.fillStyle = '#0F0';
    this.context.fillRect(140, 30, 90, 110);
    this.context.fillStyle = '#00F';
    this.context.fillRect(80, 70, 60, 40);
  }

  function animate() {
    // keep animation alive
    requestAnimationFrame(animate);
    // erase
    this.context.clearRect(0,0,600, 1000);
    //
    preShake();
    //
    drawThings();
    //
    postShake();
  }

  startShake();
  setInterval(startShake, 2500);
  animate();
}();

module.exports = CanvasShake;
