/* global KeyStore */

(function(root) {
  'use strict';

  if (typeof root.Track === "undefined") {
    root.Track = {};
  }

  var Track = root.Track = function (attributes) {
    this.name = attributes.name;
    this.roll = attributes.roll;
  };

  Track.prototype.startRecording = function () {
    this.time = Date.now();
    this.roll = [];
  };

  Track.prototype.stopRecording = function () {
    this.addNotes({notes: ["STOP"], time: Date.now()});
  };

  Track.prototype.addNotes = function (notes) {
    this.roll.push(notes);
  };

  Track.prototype.play = function () {
    var playBackStartTime = Date.now();

    var i = 0;
    var playBack = setInterval(function() {
      var timeSlice = this.roll[i].time - this.time;
      var elapsedTime = Date.now() - playBackStartTime;

      if (this.roll[i].notes[0] === "STOP") {
        KeyStore.replace([]);
        clearInterval(playBack);
      } else if (elapsedTime > timeSlice) {
        i++;
      } else {
        KeyStore.replace(this.roll[i].notes);
        // console.log(KeyStore.all());
      }
    }.bind(this), 60);

  };
}(this));
