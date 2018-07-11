const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

class App {
  constructor() {
    this.frame = 0;
    this.active = false;
    this.animationFrameId = null;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 400;

    document.body.appendChild(this.canvas);
    
    this.entities = [];
  }
  
  addEntity(altitude, velocity, angle) {
    this.entities.push({
      altitude: altitude,
      velocity: velocity,
      angle: angle
    });
  }

  pause() {
    if (this.active) {
      this.active = false;
      cancelAnimationFrame(this.animationFrameId);
      this.render();
    }
  }

  play() {
    if (!this.initialised) {
      this.initialised = true;
      this.time = performance.now();
      this.lastTime = this.time;
    }
    if (!this.active) {
      this.active = true;
      this.step();
    }
  }

  update() {
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      // let x = entity.x;
      // let y = entity.y;
      
      entity.angle += 20 * this.timeStep;
      
      // let rad = entity.angle * Math.PI / 180;

      // entity.x = entity.altitude * (x*Math.cos(rad) - y*Math.sin(rad));
      // entity.y = entity.altitude * (x*Math.sin(rad) + y*Math.cos(rad));

      if (entity.angle >= 360) entity.angle = 360 - entity.angle;
    }
  }

  render() {
    let width = this.canvas.width;
    let height = this.canvas.height;
    
    let cx = width / 2;
    let cy = height / 2;
    
    let ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.active ? 'black' : 'gray';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'cyan';
    ctx.font = '12px sans-serif';
    ctx.fillText(this.frame, 12, 24);
    
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(cx, cy, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      let rad = entity.angle * RAD;
      let altitude = entity.altitude;
      
      let x = altitude * Math.cos(rad);
      let y = altitude * Math.sin(rad);
      
      ctx.fillRect(cx + x - 2, cy + y - 2, 4, 4);

      ctx.fillText(entity.angle, 12, 48 + i * 20);

    }
  }

  step() {
    if (this.active) {
      this.time = performance.now();
      this.deltaTime = (this.time - this.lastTime);
      this.animationFrameId = requestAnimationFrame(this.step.bind(this));
      this.timeStep = this.deltaTime / 1000;
      this.update();
      this.render();
      this.frame++;
      this.lastTime = this.time;
    }
  }

}
