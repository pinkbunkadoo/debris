let app;

function onBlur() {
  app.pause();
}

function onFocus() {
  app.play();
}

document.addEventListener('DOMContentLoaded', () => {
  app = new App();
  app.addEntity(20, 1);
  app.addEntity(60, 1);
  
  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);
});
