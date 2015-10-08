window.TONES = {
  "A": 440,
  "A#": 466.16,
  "B": 493.88,
  "C": 523.25,
  "C#": 554.37
};

window.KEYMAP = {
  65: "A",
  83: "A#",
  68: "B",
  70: "C",
  71: "C#"
};
// {
//   for (var tone in window.TONES) {
//     return <Key noteName={tone} />;
//   }
// }
// getInitialState: function() {
//   return {
//     note: null
//   };
// },
// componentWillMount: function() {
//   var freq = window.TONES[this.props.noteName];
//   this.setState({note: new Note(freq)});
// },
