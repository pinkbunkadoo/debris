class App {
  constructor() {
  }
}

let app, canvas, frame, animationFrameId, active;

function start() {
  console.log('start');

  frame = 0;
  active = true;

  canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 400;

  document.body.appendChild(canvas);

  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);

  animationFrameId = requestAnimationFrame(step);
}

function pause() {
  active = false;
  cancelAnimationFrame(animationFrameId);
  render();
}

function resume() {
  active = true;
  animationFrameId = requestAnimationFrame(step);
}

function update() {

}

function render() {
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = active ? 'black' : 'gray';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'cyan';
  ctx.font = '12px sans-serif';
  ctx.fillText(frame, 12, 24);
}

function step() {
  if (active) {
    animationFrameId = requestAnimationFrame(step);
    update();
    render();
    frame++;
  }
}

function onBlur() {
  pause();
}

function onFocus() {
  resume();
}

document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  start();
});
