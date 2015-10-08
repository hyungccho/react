/* global React, Note, KeyStore */

(function(root) {
  'use strict';

  if (typeof root.Key === "undefined") {
    root.Key = {};
  }

  var Key = root.Key = React.createClass({
    getInitialState: function() {
      return {
        pressed: false
      };
    },
    componentDidMount: function() {
      var freq = window.TONES[this.props.noteName];
      this.note = new Note(freq);
      KeyStore.addChangeHandler("CHANGE", this.handleKeyPress);
    },
    handleKeyPress: function () {
      if (KeyStore.noteInStore(this.props.noteName)) {
            this.note.start();
            this.setState({pressed: true});
      } else if (!KeyStore.noteInStore(this.props.noteName) &&
                 this.state.pressed){
        this.setState({pressed: false});
        this.note.stop();
      }
    },

    render: function () {
      return (
        <div className={"note " + this.state.pressed.toString()}>{this.props.noteName}</div>
      );
    }
  });
}(this));
