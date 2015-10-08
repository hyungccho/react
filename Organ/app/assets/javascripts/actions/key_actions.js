/* global AppDispatcher*/

var KeyActions = {
  findNote: function (keyCode) {
    return window.KEYMAP[keyCode];
  },

  keyPressed: function (keyCode) {
    var noteName = this.findNote(keyCode);

    AppDispatcher.dispatch({
      actionType: "KEY_PRESS",
      noteName: noteName
    });
  },

  keyReleased: function (keyCode) {
    var noteName = this.findNote(keyCode);

    AppDispatcher.dispatch({
      actionType: "KEY_RELEASE",
      noteName: noteName
    });
  }
};
