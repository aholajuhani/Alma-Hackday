import React, { Component } from "react";
import { fetchRoute } from "../utils/hereApi";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: "Pohjois-Haaga",
      destination: "Eira",
      time: "",
      distance: ""
    };
  }

  async updateStates() {
    let route = await fetchRoute(this.state.departure, this.state.destination);
    let time = route.response.route[0].summary.travelTime;
    let distance = route.response.route[0].summary.distance;
    this.setState({
      time: (time / 60).toFixed(0),
      distance: (distance / 1000).toFixed(1)
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.updateStates();
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleError = error => {
    console.warn(error);
    return null;
  };

  render() {
    let { departure, destination } = this.state;
    return (
      <div>
        <h2>Transit App</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group col-xs-2">
            <label>From:</label>
            <input
              name="departure"
              value={departure}
              onChange={this.handleInputChange}
              type="text"
              required
              className="form-control"
              placeholder="Pohjois-Haaga"
            />
          </div>
          <div className="form-group col-xs-2">
            <label>To:</label>
            <input
              name="destination"
              value={destination}
              onChange={this.handleInputChange}
              type="text"
              required
              className="form-control"
              placeholder="Eira"
            />
          </div>
          <div className="input-group">
            <button className="btn btn-success" type="Submit">
              Search
            </button>
          </div>
        </form>
        <div className="summary">
          The trip from {this.state.departure} to {this.state.destination} is{" "}
          {this.state.distance}km and takes about {this.state.time}mins
        </div>
      </div>
    );
  }
}
