/* global React, Track, KeyStore */

(function(root) {
  'use strict';

  if (typeof root.Recorder === "undefined") {
    root.Recorder = {};
  }

  root.Recorder = React.createClass({
    getInitialState: function() {
      return {
        isRecording: false,
        track: new Track({})
      };
    },

    componentDidMount: function() {
      KeyStore.addChangeHandler("CHANGE", this.recordNote);
    },

    recordNote: function () {
      var currentTrack = this.state.track;
      var keyStore = KeyStore.all();
      currentTrack.addNotes({notes: KeyStore.all(), time: Date.now()});
    },

    invokeAction: function () {
      var action = null;

      if (this.state.isRecording) {
        this.setState({isRecording: false});
        this.state.track.stopRecording();
      } else {
        this.setState({isRecording: true});
        this.state.track.startRecording();
      }
    },

    status: function () {
      var state = "";

      if (this.state.isRecording) {
        state = "Stop";
      } else {
        state = "Start";
      }

      return state;
    },

    render: function() {
      return (
        <div>
          <button onClick={this.invokeAction}>{this.status()}</button>
          <button onClick={this.state.track.play.bind(this.state.track)}>Play</button>
        </div>
      );
    }
  });

}(this));
