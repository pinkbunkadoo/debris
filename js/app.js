
class App {
  constructor() {
    this.frame = 0;
    this.active = false;
    this.animationFrameId = null;

    this.canvas = document.createElement('canvas');
    this.canvas.width = 640;
    this.canvas.height = 400;

    document.body.appendChild(this.canvas);
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
      this.active = true;
      this.step();
    }
  }

  update() {

  }

  render() {
    let ctx = this.canvas.getContext('2d');
    ctx.fillStyle = this.active ? 'black' : 'gray';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'cyan';
    ctx.font = '12px sans-serif';
    ctx.fillText(this.frame, 12, 24);
  }

  step() {
    if (this.active) {
      this.animationFrameId = requestAnimationFrame(this.step.bind(this));
      this.update();
      this.render();
      this.frame++;
    }
  }

}
