(function () {
  "use strict";

  var React = window.React;

  if (typeof window.Minesweeper === 'undefined') {
    window.Minesweeper = {};
  }
  var Tile = React.createClass({
    determineChar: function () {
      var tile = this.props.board.grid[this.props.pos[0]][this.props.pos[1]];

      if (tile.bombed) {
        return "☀";
      } else if (tile.explored) {
        var bombCount = tile.adjacentBombCount();

        if (bombCount === 0) {
          return " ";
        } else {
          return bombCount.toString();
        }
      } else if (tile.flagged) {
        return "⚑";
      } else {
        return " ";
      }
    },

    determineClass: function () {
      var tile = this.props.board.grid[this.props.pos[0]][this.props.pos[1]];

      if (tile.bombed && tile.explored) {
        return "bombed";
      } else if (tile.explored) {
        return "explored";
      } else if (tile.flagged) {
        return "flagged";
      }
    },

    handleClick: function (e) {
      this.props.updateGame(this.props.pos, e.altKey);
    },

    render: function () {
      return (
        <div className={this.props.className + " " + this.determineClass()} onClick={this.handleClick}>
          {this.determineChar()}
        </div>
      );
    }
  });
  var Board = React.createClass({
      render: function () {
        return (
          <div>
            {
              this.props.board.grid.map(function (row, rowidx) {
                return(
                  <div className="row">
                  {
                    row.map(function (cell, cellidx) {
                      return (<Tile tile={cell}
                               key={cell.id}
                               pos={[rowidx, cellidx]}
                               className="tile"
                               updateGame={this.props.updateGame}
                               board={this.props.board} />);
                    }.bind(this))
                  }
                  </div>
                );
              }.bind(this))
            }
          </div>
        );
      }
  });


  var Game = React.createClass({
    getInitialState: function () {
      return (
        {board: new window.Minesweeper.Board(10, 10),
         gameOver: false,
         gameWon:  false }
      );
    },

    gameOverAlert: function () {
      if (this.state.gameWon) {
        alert("Congratulations!");
      } else if (this.state.gameOver) {
        alert("You lost!");
      }
    },

    updateGame: function (pos, isFlag) {
      if (isFlag) {
        this.state.board.grid[pos[0]][pos[1]].toggleFlag();
      } else {
        this.state.board.grid[pos[0]][pos[1]].explore();
      }

      this.setState({ gameOver: this.state.board.lost(),
                      gameWon: this.state.board.won()},
                      this.gameOverAlert)
    },

    render: function () {
      return <Board board={this.state.board} updateGame={this.updateGame} />;
    }

  });

React.render(<Game />, document.getElementById('main'));
})();
