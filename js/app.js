const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

class App {
  constructor() {
    this.frame = 0;
    this.active = false;
    this.animationFrameId = null;
    
    this.radius = 20;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 400;

    document.body.appendChild(this.canvas);
    
    this.entities = [];
    
    this.time = {};
    
    this.time.start = performance.now();
    this.time.actual = performance.now();
    this.time.lastActual = this.time.actual;
    this.time.game = 0;
    this.initialised = true;

    this.play();
  }
  
  addEntity(altitude, velocity) {
    this.entities.push({
      altitude: altitude,
      velocity: velocity,
      angle: 0,
      cycles: 0
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
    if (!this.active) {
      this.time.lastActual = this.time.actual = performance.now();
      this.active = true;
      this.step();
    }
  }

  update() {
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      let radius = entity.altitude + this.radius;
      let distance = Math.PI * (radius * radius);
      
      let increment = (entity.velocity * 500) * this.time.step;
      
      let fraction = increment / distance;
      
      entity.angle += (360 * fraction);
      
      // entity.angle += (entity.velocity * 20) * this.time.step;
      
      if (entity.angle >= 360) {
        entity.angle = entity.angle % 360;
        entity.cycles++;
      }
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
    ctx.fillText(this.time.game.toFixed(2), 12, 24);
    ctx.fillText(this.active, 12, 36);
    
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'red';
    ctx.font = '10px sans-serif';
    
    for (var i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];
      let rad = entity.angle * RAD;
      let altitude = entity.altitude;

      let radius = entity.altitude + this.radius;
      let distance = Math.PI * (radius * radius);

      let x = (cx) + (this.radius + altitude) * Math.cos(rad);
      let y = (cy) + (this.radius + altitude) * Math.sin(rad);
      
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(32, 32, 32)';
      ctx.arc(cx, cy, this.radius + entity.altitude, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillRect(x - 2, y - 2, 4, 4);

      ctx.fillText(entity.angle.toFixed(), x + 4, y + 12);
      ctx.fillText(distance.toFixed(), x + 4, y + 24);
      ctx.fillText(entity.cycles, x + 4, y + 36);
    }
  }

  step() {
    if (this.active) {
      this.animationFrameId = requestAnimationFrame(this.step.bind(this));
      this.frame++;

      this.time.actual = performance.now();
      this.time.delta = this.time.actual - this.time.lastActual;
      this.time.step = this.time.delta / 1000;

      this.update();
      this.render();

      this.time.lastActual = this.time.actual;
      this.time.game += this.time.step;
    }
  }

}
