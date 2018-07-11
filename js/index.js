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
  window.addEventListener('blur', onBlur);
  window.addEventListener('focus', onFocus);
});
