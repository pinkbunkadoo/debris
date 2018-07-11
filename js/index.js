let app;

function onBlur() {
  app.pause();
}

function onFocus() {
  app.play();
}

document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.play();
  app.addEntity(20, 1, 0);
  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);
});
