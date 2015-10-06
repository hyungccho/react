(function () {
  "use strict";

  var React = window.React;

  var Clock = React.createClass({
    getInitialState: function() {
      return ({date: new Date()});
    },
    componentDidMount: function () {
      setInterval(this._tick, 1000);
    },
    _tick: function () {
      var newDate = new Date(this.state.date.setMilliseconds(1000));
      this.setState({date: newDate});
    },
    render: function () {
      return (
        <div>
          {this.state.date.toString()}
          <Weather />
        </div>
      );
    }
  });

  var Weather = React.createClass({
    getInitialState: function () {
      return ({lat: "", long: "", fullLocation: ""});
    },
    componentDidMount: function () {
      navigator.geolocation.getCurrentPosition(function (pos) {
        this.setState({lat: pos.coords.latitude, long: pos.coords.longitude}, this.makeRequest);
      }.bind(this));
    },

    render: function () {
      return (
        <div>
          {this.formatData()}
        </div>
      );
    },

    formatData: function () {
      if (this.state.fullLocation === "") {
        return;
      }

      var output = this.state.fullLocation.name +
                  ", " +
                  this.state.fullLocation.weather[0].description +
                  ", " +
                  this.state.fullLocation.main.temp;

      return output;
    },

    makeRequest: function () {
      var lat = this.state.lat;
      var long = this.state.long;

      // $.ajax({
      //   url: "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long,
      //   type: "get",
      //   dataType: "json",
      //   success: function (responseData) {
      //     this.parseData(responseData);
      //   }
      // }.bind(this));

      var request = new XMLHttpRequest();
      var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long;
      request.open('GET', url, true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          this.parseData(request.responseText);
        } else {
          // We reached our target server, but it returned an error
        }
      }.bind(this);

      request.send();
    },

    parseData: function (responseData) {
      var jsonData = JSON.parse(responseData);
      this.setState({fullLocation: jsonData});
    }
  });

  React.render(<Clock />, document.getElementById("clock"));
})();
