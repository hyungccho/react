(function () {
  "use strict";

  var React = window.React;
  var Header = React.createClass({
    makeListItems: function () {
      return (
        this.props.titles.map(function (el, idx) {
          if (idx === this.props.activeIdx) {
            return <li className = "active">{el}</li>;
          } else {
            return <li>{el}</li>;
          }
        }.bind(this))
      );
    },

    render: function () {
      return (
        <ul onClick = {this.props.handleClick}>
          {this.makeListItems()}
        </ul>
      );
    }
  });

  var Tabs = React.createClass({
    getInitialState: function () {
      return {activeIndex: 0};
    },

    handleClick: function (e) {
      this.setState({activeIndex: this.props.titles.indexOf(e.target.innerHTML)});
    },

    render: function () {
      return (
        <div>
          <Header titles={this.props.titles} handleClick={this.handleClick} activeIdx={this.state.activeIndex}/>
          <article>
            {this.props.excerpts[this.state.activeIndex]}
          </article>
        </div>
      );
    }
  });

  var objects = ["Animals", "Cities", "Desserts", "Rabbits", "Cats"];
  var excerpts = ["dogs are part of the animal group", "dogs live in cities",
                  "dogs eat desserts", "dogs sometimes eat rabbits",
                  "cats also live in cities"];

  React.render(<Tabs titles = {objects} excerpts = {excerpts}/>, document.getElementById("tabs"));
})();
