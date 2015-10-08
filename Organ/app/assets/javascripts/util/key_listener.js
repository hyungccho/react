window.addEventListener('keydown', function (e) {
  if (!e.repeat) {
    KeyActions.keyPressed(e.keyCode);
  }
});

window.addEventListener('keyup', function (e) {
  KeyActions.keyReleased(e.keyCode);
});
