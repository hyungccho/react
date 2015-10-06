(function () {
  "use strict";

  var React = window.React;

  var Search = React.createClass({
    getInitialState: function () {
      return {text: ""};
    },

    render: function () {
      return (
          <div>
            <input onChange={this.handleInput} value={this.state.text}></input>
              <ul>
                {this.filteredDogs().map(function (match) {
                  return <li onClick={this.autoComplete}>{match}</li>;
                }.bind(this))}
              </ul>
          </div>
      );
    },

    autoComplete: function (e) {
      this.setState({text: e.currentTarget.innerHTML});
    },

    filteredDogs: function () {
      if (this.state.text === "") {
        return [];
      } else {
        return this.props.dogs.filter(function (dog) {
          // dog.match(this.state.text)
          return (dog.indexOf(this.state.text) !== -1);
        }.bind(this));
      }
    },
    handleInput: function (e) {
      this.setState({text: e.currentTarget.value});
    }
  });
  var dogs = ["spot", "mimi", "coco", "boomer", "bella"];
  React.render(<Search dogs={dogs}/>, document.getElementById("search"));
})();
